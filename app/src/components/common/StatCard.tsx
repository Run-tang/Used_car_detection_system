import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
}

// 数字递增动画Hook
function useCountUp(end: number, duration: number = 1000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      startTimeRef.current = null;
    };
  }, [end, duration]);

  return count;
}

export default function StatCard({ 
  title, 
  value, 
  trend = 0, 
  trendLabel = '较昨日',
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100'
}: StatCardProps) {
  const animatedValue = useCountUp(value, 1200);
  
  const isPositive = trend > 0;
  const isNeutral = trend === 0;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{animatedValue}</p>
            
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  'inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full',
                  isPositive && 'bg-emerald-100 text-emerald-700',
                  !isPositive && !isNeutral && 'bg-red-100 text-red-700',
                  isNeutral && 'bg-slate-100 text-slate-600'
                )}>
                  {isPositive && <TrendingUp className="w-3 h-3 mr-1" />}
                  {!isPositive && !isNeutral && <TrendingDown className="w-3 h-3 mr-1" />}
                  {isNeutral && <Minus className="w-3 h-3 mr-1" />}
                  {isPositive ? '+' : ''}{trend}%
                </span>
                <span className="text-xs text-slate-400 ml-2">{trendLabel}</span>
              </div>
            )}
          </div>
          
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBgColor)}>
            <Icon className={cn('w-6 h-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
