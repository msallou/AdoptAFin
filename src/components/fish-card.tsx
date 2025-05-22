import { FishProps } from '@/lib/types';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import Image from 'next/image';
import { checkIfFishAdopted } from '@/db-access/fetchUserData';
import { useEffect, useState } from 'react';
import { getCurrentUserEmail } from '@/db-access/fetchUserData';
import { importFish } from '@/app/dashboard/actions';
import { UsersAdoptedFish } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const FishCard = ({ 
    f,
    i,
    inView,
    handleAddToCart,
}: { 
    f: FishProps | null, 
    i: number,
    inView?: boolean
    handleAddToCart: (fish: FishProps, button: HTMLButtonElement) => void;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast()

    return (
        <>
            <Dialog.Root onOpenChange={setDialogOpen}>
                <motion.div
                    initial={{ opacity: 0, y: 50,  rotateY: -200 }}
                    animate={(inView || inView === null) ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -200 }}
                    transition={{ duration: 0.5, delay: 0.2 * i }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    key={i}
                    className="w-60 h-[20.1rem] [perspective:1000px] group drop-shadow-[0px_0px_4px_rgba(0,0,0,0.5)]"
                    id={i === 0 ? "fish-card" : undefined}
                    layout
                >
                    <div className="h-full w-full relative transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-lg">
                    <div className="h-full w-full absolute [backface-visibility:hidden] rounded-xl bg-[rgb(27,67,105,0.8)] border-8 border-[#0b2947]">

                        <div className='absolute w-10 h-10 flex items-center justify-center bg-sky-950 z-10 rounded-[0_50px_50px_50px]'>
                            <Image
                                src={f!.image}
                                alt={f!.fish}
                                width={90}
                                height={90}
                                className={`filter drop-shadow-[0px_0px_2px_#ffffff] `}
                                style={{
                                    filter: f!.adopted ? "brightness(1)" : "brightness(0)",
                                }}
                            />
                        </div>
                        <div className='h-[70%] w-full overflow-hidden'>

                            <div className='flex justify-between px-2'>
                                <h1 className="text-[0.8rem] font-bold  ps-10 pe-2 py-1 rounded-[0_0_5px_5px]">{f!.fish}</h1>
                                <div className="flex h-full items-center justify-center gap-1">
                                    <p className='text-[#38e1ff]'>
                                        {f!.stars}
                                    </p>
                                    <Star key={i} size={15} color="#38e1ff" fill="#38e1ff" />
                                </div>
                            </div>
                            <div className='relative flex justify-center items-center '>
                                <Image
                                    src="/adopt/fish-card-bg.png"
                                    alt={f!.fish}
                                    width={240}
                                    height={350}
                                    className="h-full object-cover w-full"
                                />
                                <Image
                                    src={f!.image}
                                    alt={f!.fish}
                                    width={200}
                                    height={200}
                                    className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-10 drop-shadow-[0px_0px_2px_#000000]"
                                />
                            </div>
                        </div>
                        <div className="py-1 px-2 relative text-white flex flex-col gap-0">
                            <p className='text-gray-400'>{f!.species}</p>
                            <span className='flex gap-1 drop-shadow-[0px_0px_5px_rgba(255,255,255,0.2)]'>
                                {f!.color.split(",").map((color, i) => (
                                    <p key={i} 
                                        style={{ 
                                            color: color.replace(/\s+/g, ''),
                                        }}
                                    >
                                        {color}
                                    </p>
                                ))}
                            </span>
                        {f!.conservationStatus.includes('Least Concern') ? (
                            <p className='text-green-500'>{f!.conservationStatus}</p>
                        ) : f!.conservationStatus.includes('Endangered') ? (
                            <p className='text-red-500'>{f!.conservationStatus}</p>
                        ) : f!.conservationStatus.includes('Critically Endangered') ? (
                            <p className='text-red-700'>{f!.conservationStatus}</p>
                        ) : f!.conservationStatus.includes('Vulnerable') ? (
                            <p className='text-yellow-500'>{f!.conservationStatus}</p>
                        ) : (
                            <p className='text-gray-400'>{f!.conservationStatus}</p>
                        )}
                        </div>
                    </div>
                    <div className="h-full w-full absolute [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg bg-[rgb(27,67,105,0.8)] z-10 border-8 border-[#0b2947]">
                        <div className="h-full w-full flex flex-col justify-between">
                        <div className='flex flex-col gap-2 justify-between h-full px-2 pt-1'>
                            <p>
                            <strong className='text-xl'>Fun Fact:</strong> {f!.fact1}
                            </p>
                            <span>
                            <Dialog.Trigger asChild className=''>
                                <p className='text-[#5bd0e4] hover:text-[#55c4ac] underline hover:no-underline
                                cursor-pointer'>
                                    <button onClick={() => {
                                        setDialogOpen(true);}}>
                                    View more →
                                    </button>
                                </p>
                            </Dialog.Trigger>
                            </span>
                        </div>
                        <span className='px-2 pb-2 pt-1'>
                            <button className='bg-[#2e5c76] hover:bg-[#264B61] hover:text-white w-full transition-all duration-300 ease-in rounded-lg p-2'
                            onClick={(e) => {
                                if (f!.adopted) {
                                    toast({
                                        title: "Fish is already adopted",
                                        variant: "destructive",
                                    });
                                    return;
                                }
                                handleAddToCart(f!, e.target as HTMLButtonElement);
                            }}
                            >
                            Add to Cart - ${f!.price!}
                            </button>
                        </span>
                        </div>
                    </div>
                    </div>
                </motion.div>
                    <Dialog.Portal>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-10"
                        />
                        <Dialog.Content className="fixed top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] z-10">
                            <div className='overflow-y-scroll bg-[rgba(13,26,37,0.8)] rounded-2xl shadow-2xl z-50 border border-[#316493] gap-8'>
                                <div className="sticky top-0 border-b border-[#233554] p-4 flex items-center justify-between">
                                    <Dialog.Title className="DialogTitle text-3xl font-bold flex w-full justify-between">
                                        {f!.fish}
                                    </Dialog.Title>
                                    <Dialog.Close asChild className=''>
                                        <button>
                                            <X />
                                        </button>
                                    </Dialog.Close>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='relative flex flex-col h-full p-5'>
                                        <Image
                                            src="/adopt/fish-card-bg.png"
                                            alt={f!.fish}
                                            width={500}
                                            height={500}
                                            className="rounded-lg w-full h-full"
                                        />
                                        <Image
                                            src={f!.image}
                                            alt={f!.fish}
                                            width={400}
                                            height={400}
                                            className="rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-[0px_0px_8px_#000000]"
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='relative flex flex-col gap-3 justify-between h-full p-5 ps-2'>
                                            {!f!.adopted && (
                                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                                    <div className='flex gap-1 drop-shadow-[0px_0px_10px_rgba(255,255,255,1)]'>
                                                        <p className='text-[#38e1ff] text-3xl font-bold drop-shadow-[0px_0px_2px_rgba(0,0,0,1)]'>
                                                            Unlock the fish to learn more!
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2 py-2'>
                                                    {[
                                                        {
                                                            label: "Species",
                                                            value: f!.species,
                                                            blur: "0",
                                                        },
                                                        {
                                                            label: "Color",
                                                            value: f!.color,
                                                            blur: "0",
                                                        },
                                                        {
                                                            label: "Speed",
                                                            value: f!.speed,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Lifespan",
                                                            value: f!.lifespan,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Diet",
                                                            value: f!.diet,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Behavior",
                                                            value: f!.schoolingBehavior,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Predators",
                                                            value: f!.predators,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Prey",
                                                            value: f!.prey,
                                                            blur: f!.adopted ? "0" : "sm",
                                                        },
                                                        {
                                                            label: "Conservation Status (IUCN Status)",
                                                            value: f!.conservationStatus,
                                                            blur: "0",
                                                        }
                                                    ].map((item, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.1 * i }}
                                                            className=''
                                                        >
                                                            <Dialog.Description key={i} className="DialogDescription flex gap-1">
                                                                <strong>{item.label}:</strong>
                                                                <p className={`select-${item.blur === "sm" ? "none" : "text"} blur-${item.blur} ${item.label === "Conservation Status (IUCN Status)" ? item.value.includes("Least Concern") ? "text-green-500" : item.value.includes("Endangered") ? "text-red-500" : item.value.includes("Critically Endangered") ? "text-red-700" : item.value.includes("Vulnerable") ? "text-yellow-500" : "" : ""}`}>
                                                                    {item.label === "Color" ? item.value.split(",").map((color: string, i: number) => (
                                                                        <span key={i} 
                                                                            style={{ color: color.replace(/\s+/g, '') }}
                                                                            className={`${color === "Black" ? "drop-shadow-[0px_0px_2px_rgba(255,255,255,1)]" : "drop-shadow-[0px_0px_5px_rgba(255,255,255,0.2)]"}`}
                                                                        >
                                                                            {color}
                                                                        </span>
                                                                    )) : item.value as string}
                                                                </p>
                                                            </Dialog.Description>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                            <motion.button
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.4 }}
                                                className='bg-[#2e5c76] hover:bg-[#264B61] hover:text-white w-full transition-all duration-300 ease-in rounded-lg p-2 self-end'
                                                onClick={(e) => {
                                                    if (f!.adopted) {
                                                        toast({
                                                            title: "Fish is already adopted",
                                                            description: "Please adopt the fish to learn more.",
                                                            variant: "destructive",
                                                        });
                                                        return;
                                                    }
                                                    handleAddToCart(f!, e.target as HTMLButtonElement);
                                                }}
                                            >
                                                Add to Cart - ${f!.price!}
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </>
    )
}