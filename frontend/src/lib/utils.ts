import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function timestampToData(time: string, withTime = true) {
    if(!time) return '~'

    if(!withTime){
        return new Date(time).toLocaleDateString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });
    }

    return new Date(time).toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}