const express = require("express");
const Thought = require("../models/Thoughts");
const Chat = require("../models/Chat");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { sendEmail } = require("../controllers/MailController");
const { sendEmail } = require("../controllers/MailController");
const router = express.Router();

// Previous endpoints (unchanged, included for completeness)
router.post("/thoughts", async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ message: "userId and text are required" });
    }
    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newThought = new Thought({
      userId,
      text,
      replies: [],
    });
    const savedThought = await newThought.save();
    res.status(201).json({
      _id: savedThought._id,
      userId: savedThought.userId.toString(),
      owner: user.name,
      text: savedThought.text,
      visible: savedThought.visible,
      createdAt: savedThought.createdAt,
      replies: [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getthoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find({ visible: "show" }).populate("userId", "name").populate("replies.userId", "name profile");
    res.status(200).json(
      thoughts.map((thought) => ({
        _id: thought._id,
        userId: thought.userId._id.toString(),
        owner: thought.userId?.name || "Unknown",
        text: thought.text,
        visible: thought.visible,
        createdAt: thought.createdAt,
        replies: thought.replies.map((reply) => ({
          userId: reply.userId._id.toString(),
          user: reply.userId?.name || "Unknown",
          profile: reply.userId?.profile || "",
          text: reply.text,
          visible: reply.visible,
          createdAt: reply.createdAt,
        })),
      })
    )
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/thoughtsreplies/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    const { userId, text } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ message: "userId and text are required" });
    }
    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    thought.replies.push({ userId, text });
    await thought.save();
    const updatedThought = await Thought.findById(req.params.id).populate("userId", "name").populate("replies.userId", "name");
    res.status(200).json({
      _id: updatedThought._id,
      userId: updatedThought.userId._id.toString(),
      owner: updatedThought.userId?.name || "Unknown",
      text: updatedThought.text,
      visible: updatedThought.visible,
      createdAt: updatedThought.createdAt,
      replies: updatedThought.replies.map((reply) => ({
        userId: reply.userId._id.toString(),
        user: reply.userId?.name || "Unknown",
        text: reply.text,
        visible: reply.visible,
        createdAt: reply.createdAt,
      })),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/changevisible/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    if (req.body.visible === "show" || req.body.visible === "hide") {
      thought.visible = req.body.visible;
    } else {
      return res.status(400).json({ message: "Invalid visibility value" });
    }
    await thought.save();
    const updatedThought = await Thought.findById(req.params.id).populate("userId", "name").populate("replies.userId", "name");
    res.status(200).json({
      _id: updatedThought._id,
      userId: updatedThought.userId._id.toString(),
      owner: updatedThought.userId?.name || "Unknown",
      text: updatedThought.text,
      visible: updatedThought.visible,
      createdAt: updatedThought.createdAt,
      replies: updatedThought.replies.map((reply) => ({
        userId: reply.userId._id.toString(),
        user: reply.userId?.name || "Unknown",
        text: reply.text,
        visible: reply.visible,
        createdAt: reply.createdAt,
      })),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/changerepliesvisibilty/:thoughtId/replies/:replyIndex", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    const reply = thought.replies[req.params.replyIndex];
    if (!reply) return res.status(404).json({ message: "Reply not found" });
    if (req.body.visible === "show" || req.body.visible === "hide") {
      reply.visible = req.body.visible;
    } else {
      return res.status(400).json({ message: "Invalid visibility value" });
    }
    await thought.save();
    const updatedThought = await Thought.findById(req.params.thoughtId).populate("userId", "name").populate("replies.userId", "name");
    res.status(200).json({
      _id: updatedThought._id,
      userId: updatedThought.userId._id.toString(),
      owner: updatedThought.userId?.name || "Unknown",
      text: updatedThought.text,
      visible: updatedThought.visible,
      createdAt: updatedThought.createdAt,
      replies: updatedThought.replies.map((reply) => ({
        userId: reply.userId._id.toString(),
        user: reply.userId?.name || "Unknown",
        text: reply.text,
        visible: reply.visible,
        createdAt: reply.createdAt,
      })),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/friendrequest", async (req, res) => {
  const { senderId, targetId } = req.body;
  try {
    if (!senderId || !targetId) {
      return res.status(400).json({ message: "senderId and targetId are required" });
    }
    const sender = await User.findById(senderId).select("name");
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    const target = await User.findById(targetId).select("name friendRequests friends email");
    if (!target) {
      return res.status(404).json({ message: "Target user not found" });
    }
    if (senderId === targetId) {
      return res.status(400).json({ message: "Cannot add yourself as a friend" });
    }
    target.friendRequests = target.friendRequests || [];
    target.friends = target.friends || [];
    if (target.friends.includes(senderId) || target.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "Already friends or request pending" });
    }
    target.friendRequests.push(senderId);
      
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
  <div style="background-color: #4A90E2; color: #fff; text-align: center; padding: 20px;">
      <h1>DOLTEC</h1>
  </div>
  <div style="padding: 20px; text-align: center;">
      <p style="font-size: 16px; color: #333;">Hello ${target.name},</p>
      <p style="font-size: 14px; color: #555;">You’ve received a new <strong>Friend Request</strong> from:</p>
      <p style="font-size: 20px; font-weight: bold; color: #4A90E2; margin: 10px 0;">${sender.name}</p>
      <p style="font-size: 14px; color: #555;">
        To view and respond to this request, please log in to your Doltec account.  
        While logging in, you can choose your preferred mode — <strong>Student</strong> or <strong>Company</strong> — to access the right dashboard.
      </p>
      <a href="https://www.doltec.in" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #4A90E2; color: #fff; text-decoration: none; border-radius: 4px;">
        Log In to Your Account
      </a>
      <p style="font-size: 12px; color: #888; margin-top: 20px;">
        If the button above doesn't work, copy and paste the following link into your browser:
      </p>
      <p style="font-size: 12px; color: #888;">
        <a href="https://www.doltec.in" style="color: #4A90E2;">https://www.doltec.in</a>
      </p>
  </div>
  <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 0; border-top: 1px solid #ddd;">
      <p>If you don’t recognize this request, you can safely ignore this email.</p>
      <p>&copy; 2025 Doltec Consultancy Services. All Rights Reserved.</p>
  </div>
</div>
    `;
     await Promise.all([
       target.save(),
        sendEmail({ email: target.email,subject: "You’ve Got a New Friend Request!", message: emailMessage }),
    ]);
     console.log("Friend request sent and email notification dispatched.");
    res.status(200).json({ message: "Friend request sent", senderName: sender.name, targetName: target.name });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error sending friend request", error: error.message });
  }
});

router.get("/checkfriend", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const user = await User.findById(userId).select("friendRequests friends").populate("friendRequests", "name").populate("friends", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.friendRequests = user.friendRequests || [];
    user.friends = user.friends || [];
    res.status(200).json({
      friendRequests: user.friendRequests.map((req) => ({
        userId: req._id.toString(),
        name: req.name || "Unknown",
      })) || [],
      friends: user.friends.map((friend) => ({
        userId: friend._id.toString(),
        name: friend.name || "Unknown",
      })) || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/acceptfriend", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { senderId } = req.body;
  try {
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.friendRequests = user.friendRequests || [];
    user.friends = user.friends || [];
    if (!user.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "No friend request from this user" });
    }
    const sender = await User.findById(senderId).select("name");
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== senderId);
    user.friends = [...user.friends, senderId];
    await user.save();
    sender.friends = sender.friends || [];
    sender.friends = [...sender.friends, userId];
    await sender.save();
    // Create or update chat document
    const chat = await Chat.findOne({
      participants: { $all: [userId, senderId] },
    });
    if (!chat) {
      await Chat.create({
        participants: [userId, senderId],
        messages: [],
      });
    }
    res.status(200).json({
      message: "Friend request accepted",
      friends: (await User.findById(userId).populate("friends", "name")).friends.map((friend) => ({
        userId: friend._id.toString(),
        name: friend.name || "Unknown",
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// New endpoint: Fetch user's chats and friend requests
router.get("/getchats", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const user = await User.findById(userId).select("friendRequests friends").populate("friendRequests", "name").populate("friends", "name profile");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.friendRequests = user.friendRequests || [];
    user.friends = user.friends || [];
    const chats = await Chat.find({
      participants: userId,
    }).populate("participants", "name");
    res.status(200).json({
      friendRequests: user.friendRequests.map((req) => ({
        userId: req._id.toString(),
        name: req.name || "Unknown",
      })),
      friends: user.friends.map((friend) => ({
        userId: friend._id.toString(),
        name: friend.name || "Unknown",
        profile: friend.profile || "",
      })),
      chats: chats.map((chat) => ({
        chatId: chat._id.toString(),
        friendId: chat.participants.find((p) => p._id.toString() !== userId)._id.toString(),
        friendName: chat.participants.find((p) => p._id.toString() !== userId).name || "Unknown",
        messages: chat.messages.map((msg) => ({
          senderId: msg.senderId.toString(),
          senderName: chat.participants.find((p) => p._id.toString() === msg.senderId.toString())?.name || "Unknown",
          text: msg.text,
          createdAt: msg.createdAt,
        })),
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// New endpoint: Send a message
router.post("/sendmessage", async (req, res) => {
  const { senderId, recipientId, text } = req.body;
  try {
    if (!senderId || !recipientId || !text) {
      return res.status(400).json({ message: "senderId, recipientId, and text are required" });
    }
    const sender = await User.findById(senderId).select("name friends");
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    const recipient = await User.findById(recipientId).select("name");
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    if (!sender.friends.includes(recipientId)) {
      return res.status(403).json({ message: "You can only message friends" });
    }
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recipientId] },
    });
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, recipientId],
        messages: [],
      });
    }
    chat.messages.push({ senderId, text });
    await chat.save();
    const updatedChat = await Chat.findById(chat._id).populate("participants", "name");
    res.status(200).json({
      chatId: chat._id.toString(),
      friendId: recipientId,
      friendName: recipient.name,
      messages: chat.messages.map((msg) => ({
        senderId: msg.senderId.toString(),
        senderName: updatedChat.participants.find((p) => p._id.toString() === msg.senderId.toString())?.name || "Unknown",
        text: msg.text,
        createdAt: msg.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error sending message", error: error.message });
  }
});

// New endpoint: SSE for real-time messages
router.get("/messages/stream", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send initial heartbeat
    res.write("data: {}\n\n");

    // Poll for new messages every 5 seconds
    const interval = setInterval(async () => {
      try {
        const chats = await Chat.find({
          participants: userId,
          "messages.createdAt": { $gt: new Date(Date.now() - 5 * 1000) },
        }).populate("participants", "name");
        if (chats.length > 0) {
          const newMessages = chats.map((chat) => ({
            chatId: chat._id.toString(),
            friendId: chat.participants.find((p) => p._id.toString() !== userId)._id.toString(),
            friendName: chat.participants.find((p) => p._id.toString() !== userId).name || "Unknown",
            messages: chat.messages
              .filter((msg) => msg.createdAt > new Date(Date.now() - 5 * 1000))
              .map((msg) => ({
                senderId: msg.senderId.toString(),
                senderName: chat.participants.find((p) => p._id.toString() === msg.senderId.toString())?.name || "Unknown",
                text: msg.text,
                createdAt: msg.createdAt,
              })),
          }));
          if (newMessages.length > 0) {
            res.write(`data: ${JSON.stringify(newMessages)}\n\n`);
          }
        }
      } catch (error) {
        console.error("SSE error:", error);
      }
    }, 5000);

    // Clean up on client disconnect
    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;