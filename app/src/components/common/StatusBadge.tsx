import { Badge } from '@/components/ui/badge';
import type { WorkOrderStatus } from '@/types';
import { getStatusText, getStatusColor } from '@/data/mock';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: WorkOrderStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary"
      className={cn(
        'px-2.5 py-1 text-xs font-medium border-0',
        getStatusColor(status),
        className
      )}
    >
      {getStatusText(status)}
    </Badge>
  );
}
