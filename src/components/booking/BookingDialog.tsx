import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Send, Calendar, Users, Plane } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addDays, isWithinInterval } from 'date-fns';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDialog({ isOpen, onClose }: BookingDialogProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "¡Hola! I'm Marina, your luxury travel concierge. When would you like to visit VillaGaleon?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
  const daysInMonth = endOfMonth(currentMonth).getDate();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Perfect! I'll help you plan an unforgettable stay. Would you like me to include our signature yacht experience in your itinerary?",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleDateClick = (date: Date) => {
    if (!selectedDate) {
      setSelectedDate(date);
      const suggestedEndDate = addDays(date, 6); // Suggest a week stay
      setHoverDate(suggestedEndDate);
    } else if (!selectedEndDate && date > selectedDate) {
      setSelectedEndDate(date);
      // Send a message about the selected dates
      const userMessage = {
        id: Date.now().toString(),
        content: `I'd like to stay from ${format(selectedDate, 'MMM d')} to ${format(date, 'MMM d')}`,
        sender: 'user' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
    } else {
      setSelectedDate(date);
      setSelectedEndDate(null);
      setHoverDate(null);
    }
  };

  const handleDateHover = (date: Date) => {
    if (selectedDate && !selectedEndDate && date > selectedDate) {
      setHoverDate(date);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-caribbean-900 to-caribbean-800 text-white">
          <h2 className="text-xl font-display font-semibold">
            Confirma las fechas seleccionadas
          </h2>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-caribbean-100">
              <Calendar className="w-5 h-5" />
              <span>{selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Selecciona fecha de entrada'}</span>
            </div>
            {selectedDate && (
              <div className="flex items-center gap-2 text-caribbean-100">
                <Calendar className="w-5 h-5" />
                <span>{selectedEndDate ? format(selectedEndDate, 'MMM d, yyyy') : 'Selecciona fecha de salida'}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[600px]">
          {/* Calendar Section */}
          <div className="w-1/2 border-r border-caribbean-100 p-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-3">
                {[0, 1, 2].map((offset) => (
                  <button
                    key={offset}
                    onClick={() => setCurrentMonth(addMonths(new Date(), offset))}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isSameMonth(currentMonth, addMonths(new Date(), offset))
                        ? "bg-caribbean-500 text-white shadow-md"
                        : "text-caribbean-600 hover:bg-caribbean-50 hover:shadow"
                    )}
                  >
                    {format(addMonths(new Date(), offset), 'MMM yyyy')}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-caribbean-50 text-caribbean-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
                className="p-2 rounded-full hover:bg-caribbean-50 text-caribbean-600 transition-colors"
                disabled={isSameMonth(currentMonth, new Date())}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-medium text-caribbean-800">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
                className="p-2 rounded-full hover:bg-caribbean-50 text-caribbean-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-medium text-caribbean-400"
                >
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10" />
              ))}
              
              {days.map((day) => {
                const isSelected = selectedDate?.getTime() === day.getTime() || 
                                 selectedEndDate?.getTime() === day.getTime();
                const isInRange = selectedDate && selectedEndDate && 
                                isWithinInterval(day, { start: selectedDate, end: selectedEndDate });
                const isHovered = selectedDate && hoverDate && 
                                isWithinInterval(day, { start: selectedDate, end: hoverDate });

                return (
                  <button 
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => handleDateHover(day)}
                    onMouseLeave={() => setHoverDate(null)}
                    disabled={day < new Date()}
                    className={cn(
                      "h-10 w-10 rounded-full relative",
                      "flex items-center justify-center",
                      "text-sm transition-all duration-300",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "hover:bg-caribbean-50",
                      isToday(day) && "font-semibold",
                      !isSameMonth(day, currentMonth) && "text-gray-400",
                      isSelected && "bg-caribbean-500 text-white font-medium shadow-lg",
                      (isInRange || isHovered) && "bg-caribbean-100 shadow-sm",
                      !selectedDate && !selectedEndDate &&
                        "hover:bg-caribbean-50 hover:text-caribbean-900"
                    )}
                  >
                    <span className="relative z-10">
                      {format(day, 'd')}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-0 animate-ping bg-caribbean-500 rounded-full opacity-75" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Section */}
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      "shadow-sm",
                      message.sender === 'user'
                        ? "bg-caribbean-500 text-white"
                        : "bg-caribbean-50 text-caribbean-900"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-caribbean-100 bg-caribbean-50/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="¿Tienes alguna pregunta sobre tu reserva?"
                  className={cn(
                    "flex-1 px-4 py-2 rounded-full",
                    "border-2 border-caribbean-200",
                    "focus:ring-2 focus:ring-caribbean-400 focus:border-transparent",
                    "placeholder:text-caribbean-400",
                    "transition-shadow duration-200",
                    "shadow-sm hover:shadow-md"
                  )}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className={cn(
                    "p-3 rounded-full",
                    "bg-caribbean-500 text-white",
                    "hover:bg-caribbean-600 transition-all duration-200",
                    "shadow-md hover:shadow-lg",
                    "transform hover:-translate-y-0.5"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}