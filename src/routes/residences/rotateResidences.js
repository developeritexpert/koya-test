
import { gsap, Linear } from 'gsap/all';


export default function rotateResidences (increment, currRotation, onUpdating, onComplete) {
    const tweenObj = { rotation: currRotation };
    gsap.to(tweenObj, 0.8, { 
        rotation: increment, 
        modifiers: {
            rotation: function (rotation) {
                let returnRotation;
                if (rotation < 0) {
                    returnRotation = Math.round(rotation % 72) + 72;
                } else {
                    returnRotation = Math.round(rotation % 72);
                }
                return returnRotation;
            }
        },
        ease: Linear.easeNone,
        onUpdate: () => {
            onUpdating(tweenObj.rotation);
        }, 
        onComplete: () => {
            onComplete();
        }
    });
}
