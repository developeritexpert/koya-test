
import { gsap } from 'gsap/all';

export const utilAnimate = {
    fadeIn: (element, speed = 0.5) => {
        gsap.killTweensOf(element);
        let tl = gsap.timeline();

        // Check direction class
        const fromX = element.classList.contains('leftDir') ? -50 :
            element.classList.contains('rytDir') ? 50 : 0;

        tl.set(element, {
            x: fromX,
            opacity: 0,
            display: 'block'
        }).to(element, {
            x: 0,
            duration: speed,
            opacity: 1,
            ease: "back.out(1.7)"
        });
    },

    fadeOut: (element, speed = 0.5) => {
        gsap.killTweensOf(element);
        let tl = gsap.timeline();

        // Check direction class
        const toX = element.classList.contains('leftDir') ? -50 :
            element.classList.contains('rytDir') ? 50 : 0;

            tl.to(element, {
            x: toX,
            duration: speed,
            opacity: 0,
            ease: "expo.inOut",
            onComplete: () => {
                element.style.display = 'none';
            }
            });

    }
}
