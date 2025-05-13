
import { useState } from "react";
import { useChat, MessageResponse, FeedbackRating } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LikertScale } from "./LikertScale";

interface RatingFormProps {
  response: MessageResponse;
}

const formSchema = z.object({
  coherence: z.number().min(1).max(5),
  clarity: z.number().min(1).max(5),
  relevance: z.number().min(1).max(5),
  usefulness: z.number().min(1).max(5),
  trustworthiness: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export function RatingForm({ response }: RatingFormProps) {
  const { evaluatingResponse, submitEvaluation, resetEvaluation } = useChat();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coherence: 3,
      clarity: 3,
      relevance: 3,
      usefulness: 3,
      trustworthiness: 3,
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const messageId = response.id.split("-response-")[0];
    submitEvaluation(messageId, response.id, values);
  };

  const criteriaLabels = {
    coherence: "Coerência",
    clarity: "Clareza",
    relevance: "Relevância",
    usefulness: "Utilidade",
    trustworthiness: "Confiabilidade",
  };

  return (
    <Dialog open={!!evaluatingResponse} onOpenChange={(open) => !open && resetEvaluation()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Avalie a resposta selecionada</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {Object.entries(criteriaLabels).map(([name, label]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof FeedbackRating}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <FormLabel className="min-w-[120px]">{label}</FormLabel>
                        <FormControl>
                          <LikertScale
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentários adicionais (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Compartilhe aqui suas observações sobre a resposta..."
                      className="resize-none min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetEvaluation}>
                Cancelar
              </Button>
              <Button type="submit">Enviar avaliação</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
