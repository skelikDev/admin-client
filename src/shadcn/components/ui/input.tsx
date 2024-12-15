import * as React from 'react';
import { cn } from '@/shadcn/lib/utils.ts';
import IMask, { MaskedOptions } from 'imask';
import { useEffect, useRef } from 'react';

export type TInputProps = {
  maskOptions?: MaskedOptions;
} & React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ className, maskOptions, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (inputRef.current && maskOptions) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const mask = IMask(inputRef.current, maskOptions);
        mask.on('accept', () => {
          if (inputRef.current && 'dispatchEvent' in inputRef.current) {
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);
          }
        });

        return () => {
          mask.destroy();
        };
      }
    }, [maskOptions]);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const classname = cn(
      'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    );

    console.log(classname);

    return <input className={classname} ref={inputRef} {...props} />;
  }
);

Input.displayName = 'Input';

export { Input };
