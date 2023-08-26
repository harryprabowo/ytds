import React, { useState, useCallback, useEffect } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`
const TWEEN_FACTOR = 0.5

export const LazyLoadImage = ({emblaApi, ...props}) => {
    const { imgSrc, inView, index } = props
    const [hasLoaded, setHasLoaded] = useState(false)
    const [tweenValues, setTweenValues] = useState([])

    const setLoaded = useCallback(() => {
        if (inView) setHasLoaded(true)
    }, [inView, setHasLoaded])
    
    const onScroll = useCallback(() => {
        if (!emblaApi) return

        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()

        const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
            let diffToTarget = scrollSnap - scrollProgress

            if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem) => {
                    const target = loopItem.target()
                    if (index === loopItem.index && target !== 0) {
                        const sign = Math.sign(target)
                        if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                        if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                    }
                })
            }
            return diffToTarget * (-1 / TWEEN_FACTOR) * 100
        })
        setTweenValues(styles)
    }, [emblaApi, setTweenValues])


    useEffect(() => {
        if (!emblaApi) return
        onScroll()
        emblaApi.on('scroll', () => {
            flushSync(() => onScroll())
        })
        emblaApi.on('reInit', onScroll)
    }, [emblaApi, onScroll])

    return (
        <div className="embla__slide">
            <div
                className={'embla__lazy-load'.concat(
                    hasLoaded ? ' embla__lazy-load--has-loaded' : ''
                )}
            >
                {!hasLoaded && <span className="embla__lazy-load__spinner" />}
                <div className="embla__slide__number">
                    <span>{index + 1}</span>
                </div>
                <div className="embla__parallax">
                    <div
                        className="embla__parallax__layer"
                        style={{
                            ...(tweenValues.length && {
                                transform: `translateX(${tweenValues[index]}%)`
                            })
                        }}
                    >
                        <div className="embla__slide__img__container">
                            <Image
                                className="embla__slide__img embla__lazy-load__img"
                                onLoad={setLoaded}
                                src={inView ? imgSrc : PLACEHOLDER_SRC}
                                data-src={imgSrc}
                                alt="Your alt text"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
