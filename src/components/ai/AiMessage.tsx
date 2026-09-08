import { memo } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, Box } from 'lucide-react';
import { CASE_STUDIES } from '@/data/projects';

export interface MessageProps {
  role: 'user' | 'model';
  content: string;
  onOpenXRay: (projectId: string) => void;
}

const AiMessage = memo(function AiMessage({ role, content, onOpenXRay }: MessageProps) {
  const isUser = role === 'user';

  // Basic parser for **bold** and [XRAY:id]
  const renderContent = (text: string) => {
    // Check for [XRAY:project_id] tags
    const xrayRegex = /\[XRAY:([a-zA-Z0-9-]+)\]/g;
    const parts = text.split(xrayRegex);
    
    // If there's an XRAY tag, it will split into [text before, project_id, text after]
    if (parts.length > 1) {
      return (
        <div className="space-y-4">
          {parts.map((part, index) => {
            // Even indices are text, odd are project IDs
            if (index % 2 === 1) {
              const project = CASE_STUDIES.find(p => p.id === part);
              if (!project) return null;
              
              return (
                <div 
                  key={index}
                  onClick={() => onOpenXRay(part)}
                  className="my-3 p-3 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Box className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-accent font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Inspect Architecture
                      </p>
                      <p className="font-display text-sm font-bold text-foreground">
                        {project.title}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-accent transition-colors">
                    Open X-Ray →
                  </span>
                </div>
              );
            }
            
            // Text parts - basic bold parsing
            if (!part.trim()) return null;
            return <p key={index} className="whitespace-pre-wrap">{formatBoldText(part)}</p>;
          })}
        </div>
      );
    }

    return <p className="whitespace-pre-wrap">{formatBoldText(text)}</p>;
  };

  // Helper to parse **bold**
  const formatBoldText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-4 h-4 text-accent" />
        </div>
      )}
      
      <div 
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          isUser 
            ? 'bg-secondary text-foreground rounded-tr-sm border border-border' 
            : 'bg-transparent text-muted-foreground'
        }`}
      >
        {renderContent(content)}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-4 h-4 text-foreground" />
        </div>
      )}
    </motion.div>
  );
});

export default AiMessage;
