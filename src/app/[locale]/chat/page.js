'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPaperPlane,
  faUsers,
  faEllipsisV,
  faTrash,
  faEdit,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [sending, setSending] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const [openMenuId, setOpenMenuId] = useState(null);

  const [shouldAutoScroll, setShouldAutoScroll] =
    useState(true);

  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // USER

  useEffect(() => {
    const u = localStorage.getItem('user');

    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  // FETCH

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        '/api/chat/messages'
      );

      setMessages((prev) => {
        const prevIds = new Set(
          prev.map((m) => m._id)
        );

        const fresh = data.filter(
          (m) => !prevIds.has(m._id)
        );

        return fresh.length
          ? [...prev, ...fresh]
          : prev;
      });
    } catch (err) {
      console.log(err);
    }
  };

  // AUTO SCROLL SMART

  const handleScroll = () => {
    const container = containerRef.current;

    if (!container) return;

    const nearBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      120;

    setShouldAutoScroll(nearBottom);
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, shouldAutoScroll]);

  // SEND

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !user || sending)
      return;

    const tempId = Date.now();

    const optimisticMessage = {
      _id: tempId,
      sender: user.name,
      senderId: user.id,
      message: newMessage,
      createdAt: new Date().toISOString(),
      pending: true
    };

    setMessages((prev) => [
      ...prev,
      optimisticMessage
    ]);

    setNewMessage('');
    setSending(true);

    try {
      const { data } = await axios.post(
        '/api/chat/messages',
        {
          sender: user.name,
          senderId: user.id,
          message: optimisticMessage.message
        }
      );

      setMessages((prev) =>
        prev.map((m) =>
          m._id === tempId ? data : m
        )
      );
    } catch {
      toast.error('Erreur');

      setMessages((prev) =>
        prev.filter((m) => m._id !== tempId)
      );
    } finally {
      setSending(false);
    }
  };

  // DELETE

  const deleteMessage = async (id) => {
    try {
      await axios.delete(
        `/api/chat/messages/${id}`
      );

      setMessages((prev) =>
        prev.filter((m) => m._id !== id)
      );

      toast.success('Supprimé');
    } catch {
      toast.error('Erreur');
    }

    setOpenMenuId(null);
  };

  // EDIT

  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    try {
      await axios.put(
        `/api/chat/messages/${id}`,
        {
          message: editText
        }
      );

      setMessages((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                message: editText,
                edited: true
              }
            : m
        )
      );

      setEditingId(null);

      toast.success('Modifié');
    } catch {
      toast.error('Erreur');
    }
  };

  // OWN

  const isOwn = (msg) =>
    msg.senderId === user?.id;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-stone-100 via-white to-stone-200 overflow-hidden">

      {/* BACKGROUND EFFECT */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-primary-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-300/20 blur-3xl rounded-full" />
      </div>

      {/* HEADER */}

      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">

        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center shadow-xl">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-white text-xl"
              />
            </div>

            <div>
              <h1 className="font-black text-2xl text-stone-800 tracking-tight">
                AYSA Community
              </h1>

              <p className="text-sm text-stone-400">
                {messages.length} messages
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0)}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-bold text-stone-700">
                {user?.name}
              </p>

              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-xs text-green-500">
                  Online
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CHAT */}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-8 scroll-smooth"
      >

        <div className="max-w-5xl mx-auto space-y-5">

          {messages.length === 0 && (
            <div className="h-[70vh] flex items-center justify-center">

              <div className="text-center">

                <div className="w-24 h-24 rounded-[30px] bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto shadow-2xl mb-6">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-white text-3xl"
                  />
                </div>

                <h2 className="text-2xl font-black text-stone-700 mb-2">
                  Aucun message
                </h2>

                <p className="text-stone-400">
                  Soyez le premier à écrire 🚀
                </p>

              </div>

            </div>
          )}

          <AnimatePresence>

            {messages.map((msg) => {
              const own = isOwn(msg);

              return (
                <motion.div
                  key={msg._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.96
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${
                    own
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >

                  <div className="max-w-[80%] group relative">

                    {!own && (
                      <div className="flex items-center gap-2 ml-2 mb-1">

                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-[10px] font-bold">
                          {msg.sender?.charAt(0)}
                        </div>

                        <p className="text-xs font-bold text-primary-600">
                          {msg.sender}
                        </p>

                      </div>
                    )}

                    <div
                      className={`relative rounded-[28px] px-5 py-4 shadow-lg border backdrop-blur-xl transition-all duration-300
                      ${
                        own
                          ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white border-primary-400 rounded-br-md'
                          : 'bg-white/80 text-stone-700 border-white/60 rounded-bl-md'
                      }`}
                    >

                      {/* MENU */}

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-200">

                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === msg._id
                                ? null
                                : msg._id
                            )
                          }
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition
                          ${
                            own
                              ? 'hover:bg-white/20'
                              : 'hover:bg-stone-200'
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            className="text-xs"
                          />
                        </button>

                        {openMenuId === msg._id && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                              scale: 0.95
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1
                            }}
                            className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 min-w-[160px]"
                          >

                            {own && (
                              <button
                                onClick={() => {
                                  setEditingId(
                                    msg._id
                                  );

                                  setEditText(
                                    msg.message
                                  );

                                  setOpenMenuId(
                                    null
                                  );
                                }}
                                className="w-full px-4 py-3 text-sm hover:bg-stone-50  text-black flex items-center gap-3 font-medium"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                />
                                Modifier
                              </button>
                            )}

                            <button
                              onClick={() =>
                                deleteMessage(
                                  msg._id
                                )
                              }
                              className="w-full px-4 py-3 text-sm hover:bg-red-50 text-red-500 flex items-center gap-3 font-medium"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                              />
                              Supprimer
                            </button>

                          </motion.div>
                        )}

                      </div>

                      {/* MESSAGE */}

                      {editingId === msg._id ? (
                        <div className="mt-2">

                          <div className="mb-2">
                            <p className="text-[11px] uppercase tracking-widest opacity-60 font-bold">
                              Modification du message
                            </p>
                          </div>

                          <div className="flex items-center gap-2">

                            <input
                              value={editText}
                              onChange={(e) =>
                                setEditText(
                                  e.target.value
                                )
                              }
                              autoFocus
                              className={`flex-1 rounded-2xl px-4 py-3 text-sm outline-none border
                              ${
                                own
                                  ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50'
                                  : 'bg-stone-100 border-stone-200 text-stone-700'
                              }`}
                            />

                            <button
                              onClick={() =>
                                saveEdit(msg._id)
                              }
                              className="w-10 h-10 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg transition"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                              />
                            </button>

                            <button
                              onClick={() =>
                                setEditingId(null)
                              }
                              className="w-10 h-10 rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg transition"
                            >
                              <FontAwesomeIcon
                                icon={faTimes}
                              />
                            </button>

                          </div>

                        </div>
                      ) : (
                        <div>

                          <p className="leading-relaxed break-words text-[15px]">
                            {msg.message}
                          </p>

                          {msg.edited && (
                            <span className="text-[11px] opacity-60 mt-2 inline-block">
                              modifié
                            </span>
                          )}

                        </div>
                      )}

                    </div>

                    <p
                      className={`text-[11px] text-stone-400 mt-1 font-medium
                      ${
                        own
                          ? 'text-right mr-2'
                          : 'ml-2'
                      }`}
                    >
                      {new Date(
                        msg.createdAt
                      ).toLocaleTimeString(
                        'fr-FR',
                        {
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      )}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </AnimatePresence>

          <div ref={messagesEndRef} />

        </div>

      </div>

      {/* INPUT */}

      <div className="sticky bottom-0 z-20 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">

        <form
          onSubmit={sendMessage}
          className="max-w-5xl mx-auto"
        >

          <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-[30px] border border-white/60 shadow-2xl px-4 py-3">

            <input
              value={newMessage}
              onChange={(e) =>
                setNewMessage(e.target.value)
              }
              placeholder="Écrivez votre message..."
              className="flex-1 bg-transparent px-3 py-2 outline-none text-[15px] placeholder:text-stone-400"
            />

            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={
                sending || !newMessage.trim()
              }
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-2xl disabled:opacity-50 flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-lg"
              />
            </motion.button>

          </div>

        </form>

      </div>

    </div>
  );
}