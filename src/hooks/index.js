import { useState, useEffect } from "react";

export function useCountUp(target, duration=2000, go=false) {
  const [n,setN]=useState(0);
  useEffect(()=>{if(!go)return;let t0=null;const tick=ts=>{if(!t0)t0=ts;const p=Math.min((ts-t0)/duration,1);setN(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);},[target,duration,go]);
  return n;
}

export function useIsMobile(){
  const[m,setM]=useState(typeof window!=="undefined"&&window.innerWidth<768);
  useEffect(()=>{const h=()=>setM(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return m;
}

