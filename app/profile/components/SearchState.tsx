import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandGroup, CommandItem, CommandEmpty } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function SearchState({
	states,
	value,
	onChange,
	disabled,
}: {
	states: any[];
	value: string;
	onChange: (val: string) => void;
	disabled?: boolean;
}) {
	const [open, setOpen] = useState(false);

	const getName = (m: any) => m.name ?? m.full_name ?? m.nombre ?? '';
	const getId = (m: any) => m.id ?? m.municipality_id ?? m.muni_id ?? m.code ?? getName(m);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='default'
					role='combobox'
					disabled={disabled}
					className='w-full justify-between text-black border border-violet-300 hover:bg-violet-100 focus:border-violet-500 bg-violet-100'
				>
					{value || 'Escribe una ciudad'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>

			<PopoverContent className='p-0'>
				<Command className='bg-violet-100 w-full'>
					<CommandInput
						placeholder='Buscar ciudad...'
						value={value} // valor sincronizado con el form
						onValueChange={onChange} // actualizar el form
					/>
					<CommandEmpty>No se encontraron resultados.</CommandEmpty>
					<CommandGroup>
						{states.map((m) => {
							const name = getName(m);
							const id = getId(m);
							return (
								<CommandItem key={id} value={name} onSelect={(val) => onChange(val)}>
									<Check className={cn('mr-2 h-4 w-4', value === name ? 'opacity-100' : 'opacity-0')} />
									{name}
								</CommandItem>
							);
						})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
