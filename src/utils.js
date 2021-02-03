import {navigate} from "svelte-routing";

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function redirect(to) {
    await sleep(1000); // After initial page render navigate won't draw the next view without this sleep.
    navigate(to);
}
