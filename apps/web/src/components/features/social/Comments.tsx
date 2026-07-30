import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment, User } from '../../../types';

interface CommentsProps {
  comments: Comment[];
  currentUser: User;
  hideTitle?: boolean;
}

const getInitial = (name?: string) => (name?.trim()?.slice(0, 1) || 'م').toUpperCase();

export const Comments: React.FC<CommentsProps> = ({
  comments: initialComments,
  currentUser,
  hideTitle = false,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: 'الآن',
    };

    setComments((current) => [...current, comment]);
    setNewComment('');
  };

  return (
    <section dir="rtl" className={hideTitle ? 'space-y-4' : 'my-8 space-y-4 border-t border-border pt-6'}>
      {!hideTitle && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-right">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">التعليقات والنقاش</h2>
            </div>
            <p className="text-sm text-muted-foreground">مساحة مختصرة لتبادل الملاحظات حول المشروع.</p>
          </div>
          <Badge variant="secondary">{comments.length} تعليق</Badge>
        </div>
      )}

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">سجل النقاش</CardTitle>
          <CardDescription>اكتب ملاحظة واضحة تساعد الفريق على اتخاذ قرار أفضل.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.length === 0 ? (
            <div className="rounded-lg bg-muted/40 px-4 py-8 text-center">
              <p className="text-sm font-medium text-foreground">لا توجد تعليقات بعد</p>
              <p className="mt-1 text-sm text-muted-foreground">ابدأ النقاش بإضافة أول ملاحظة على المشروع.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <article key={comment.id} className="flex gap-3 rounded-lg bg-muted/30 p-3 text-right">
                  <Avatar className="mt-0.5" size="sm">
                    {comment.avatar ? <AvatarImage src={comment.avatar} alt={comment.user} /> : null}
                    <AvatarFallback>{getInitial(comment.user)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{comment.text}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="flex gap-3 border-t border-border pt-4">
            <Avatar className="mt-1">
              {currentUser.avatar ? <AvatarImage src={currentUser.avatar} alt={currentUser.name} /> : null}
              <AvatarFallback>{getInitial(currentUser.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-3">
              <Textarea
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                placeholder="اكتب ملاحظاتك أو استفساراتك هنا..."
                className="min-h-24 resize-none bg-background text-right"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddComment} disabled={!newComment.trim()} size="sm">
                  <Send className="h-4 w-4" />
                  إضافة تعليق
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
