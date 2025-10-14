import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialReview?: string;
  onSave: (review: string) => void;
  movieTitle: string;
}

export function ReviewModal({
  open,
  onOpenChange,
  initialReview = '',
  onSave,
  movieTitle,
}: ReviewModalProps) {
  const [review, setReview] = useState(initialReview);

  const handleSave = () => {
    onSave(review);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write a Review for {movieTitle}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          className="min-h-[200px]"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
