
import React, { useState } from 'react';
import { useChat, MessageResponse, FeedbackRating } from '@/contexts/ChatContext';
import { ReactButton } from './ui/ReactButton';
import { ReactTextarea } from './ui/ReactTextarea';
import { ReactDialog } from './ui/ReactDialog';
import { ReactLikertScale } from './ReactLikertScale';
import './ReactRatingForm.css';

interface ReactRatingFormProps {
  response: MessageResponse;
}

export function ReactRatingForm({ response }: ReactRatingFormProps) {
  const { evaluatingResponse, submitEvaluation, resetEvaluation } = useChat();
  
  const [ratings, setRatings] = useState({
    coherence: 3,
    clarity: 3,
    relevance: 3,
    usefulness: 3,
    trustworthiness: 3,
  });
  
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: Record<string, string> = {};
    if (!comment.trim()) {
      newErrors.comment = 'A justificativa é obrigatória';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const messageId = response.id.split("-response-")[0];
    submitEvaluation(messageId, response.id, {
      ...ratings,
      comment: comment.trim(),
    });
    
    // Reset form
    setRatings({
      coherence: 3,
      clarity: 3,
      relevance: 3,
      usefulness: 3,
      trustworthiness: 3,
    });
    setComment('');
    setErrors({});
  };

  const handleRatingChange = (criterion: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [criterion]: value }));
  };

  const criteriaLabels = {
    coherence: "Coerência",
    clarity: "Clareza",
    relevance: "Relevância",
    usefulness: "Utilidade",
    trustworthiness: "Confiabilidade",
  };

  return (
    <ReactDialog 
      open={!!evaluatingResponse} 
      onOpenChange={(open) => !open && resetEvaluation()}
      title="Avalie a resposta selecionada"
    >
      <form onSubmit={onSubmit} className="react-rating-form">
        <div className="react-rating-criteria">
          {Object.entries(criteriaLabels).map(([name, label]) => (
            <div key={name} className="react-rating-field">
              <div className="react-rating-label-container">
                <label className="react-rating-label">{label}</label>
                <ReactLikertScale
                  value={ratings[name as keyof typeof ratings]}
                  onChange={(value) => handleRatingChange(name as keyof typeof ratings, value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="react-comment-field">
          <label className="react-comment-label">
            Justificativa <span className="react-required">*</span>
          </label>
          <ReactTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Compartilhe aqui suas observações sobre a resposta..."
            className="react-comment-textarea"
          />
          {errors.comment && (
            <div className="react-error-message">{errors.comment}</div>
          )}
        </div>
        
        <div className="react-rating-footer">
          <ReactButton type="button" variant="outline" onClick={resetEvaluation}>
            Cancelar
          </ReactButton>
          <ReactButton type="submit">Enviar avaliação</ReactButton>
        </div>
      </form>
    </ReactDialog>
  );
}
