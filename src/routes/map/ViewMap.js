import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { data } from './dataMap';
import ViewMapMenu from './ViewMapMenu';
import ConnectViewMapItem from './ConnectViewMapItem';
import { SidebarProvider, useSidebar } from './SidebarContext';
import './stylesMap.scss';

function useResizeObserver(ref, deps = []) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return size;
}

/**
 * Given container size and image natural size, compute the displayed image size at scale=1
 * using "contain" behavior (fits completely inside without cropping).
 */
function getDisplayedSizeAtScale1(containerW, containerH, imgW, imgH) {
  if (!containerW || !containerH || !imgW || !imgH) return { w: 0, h: 0 };
  const containerRatio = containerW / containerH;
  const imageRatio = imgW / imgH;

  if (containerRatio <= imageRatio) {
    const w = containerW;
    const h = Math.round(w / imageRatio);
    return { w, h };
  } else {
    const h = containerH;
    const w = Math.round(h * imageRatio);
    return { w, h };
  }
}

/**
 * Compute translation bounds so the scaled image never reveals background.
 * Returns { xMin, xMax, yMin, yMax } for MapInteractionCSS.translationBounds.
 * Translations are in CSS pixel space for the transformed element.
 */
function computeBounds({ containerW, containerH, baseW, baseH, scale }) {
  // Scaled content size
  const scaledW = baseW * scale;
  const scaledH = baseH * scale;

  // If content smaller than container on an axis, lock to left position (xMin=xMax=0) and centered vertically
  let xMin, xMax, yMin, yMax;

  if (scaledW <= containerW) {
    xMin = xMax = 0; // Left-aligned instead of centered
  } else {
    // Allow sliding from left-aligned (0) to right-aligned (containerW - scaledW)
    xMin = Math.round(containerW - scaledW);
    xMax = 0;
  }

  if (scaledH <= containerH) {
    const ty = Math.round((containerH - scaledH) / 2);
    yMin = yMax = ty;
  } else {
    yMin = Math.round(containerH - scaledH);
    yMax = 0;
  }

  return { xMin, xMax, yMin, yMax };
}

/**
 * Clamp a translation to bounds.
 */
function clampTranslation({ x, y }, { xMin, xMax, yMin, yMax }) {
  return {
    x: Math.min(Math.max(x, xMin), xMax),
    y: Math.min(Math.max(y, yMin), yMax),
  };
}

function MapContent() {
  const  isOpen  = false;

  const containerRef = useRef(null);
  const { width: containerW, height: containerH } = useResizeObserver(containerRef, [isOpen]);

  const [imgNatural, setImgNatural] = useState({ w: 1920, h: 980 });
  const onImgLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) setImgNatural({ w: naturalWidth, h: naturalHeight });
  };

  const items = useMemo(() => {
    const out = [];
    let currIndex = 0;
    for (let i = 0; i < data.length; i++) {
      const currGroup = data[i].options;
      for (let j = 0; j < currGroup.length; j++) {
        const currItem = currGroup[j];
        out.push(<ConnectViewMapItem key={currIndex} item={currItem.title} />);
        currIndex++;
      }
    }
    return out;
  }, []);

  const [value, setValue] = useState({
    scale: 1,
    translation: { x: 0, y: 0 },
  });

  const [isZoomed, setIsZoomed] = useState(false);

  const baseSize = useMemo(
    () => getDisplayedSizeAtScale1(containerW, containerH, imgNatural.w, imgNatural.h),
    [containerW, containerH, imgNatural.w, imgNatural.h]
  );

  const bounds = useMemo(
    () =>
      computeBounds({
        containerW,
        containerH,
        baseW: baseSize.w,
        baseH: baseSize.h,
        scale: value.scale,
      }),
    [containerW, containerH, baseSize.w, baseSize.h, value.scale]
  );

  useEffect(() => {
    setValue((prev) => {
      // If zoomed out (scale <= 1) -> align to left (0) and center vertically
      if (prev.scale <= 1) {
        return {
          ...prev,
          translation: {
            x: 0,
            y: Math.round((containerH - baseSize.h) / 2),
          },
        };
      }

      // If zoomed in -> only clamp, don't reset position
      return {
        ...prev,
        translation: clampTranslation(prev.translation, bounds),
      };
    });
  }, [containerW, containerH, baseSize.w, baseSize.h, bounds]);

  const onChange = (next) => {
    const nextScale = next.scale ?? value.scale;
    let nextTranslation = next.translation ?? value.translation;

    // Clamp translation to bounds
    nextTranslation = clampTranslation(nextTranslation, bounds);
    setValue({ scale: nextScale, translation: nextTranslation });
  };

  // Zoom controls for your menu
  const zoomIn = () => {
    if (value.scale >= 2) return;

    // Zoom directly to 2x scale at center
    const centerX = containerW / 2;
    const centerY = containerH / 2;
    const scaleFactor = 2 / value.scale;
    const newX = centerX - scaleFactor * (centerX - value.translation.x);
    const newY = centerY - scaleFactor * (centerY - value.translation.y);

    setValue({
      scale: 2,
      translation: { x: newX, y: newY }
    });

    setIsZoomed(true);
  };

  const zoomOut = () => {
    setValue({
      scale: 1,
      translation: {
        x: 0,
        y: Math.round((containerH - baseSize.h) / 2),
      },
    });

    setIsZoomed(false);
  };

  return (
    <div
      ref={containerRef}
      className="aerial-map--transform-container"
      style={{
        width: '1920px',



        transition: 'width 0.5s ease-in-out',
        position: 'relative',
      }}
    >
      <MapInteractionCSS
        class="map-int"
        value={value}
        onChange={onChange}
        minScale={1}
        maxScale={2}
        showControls={false}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <img
            className="shared--img-fill-map aerial-map--bkg"
            src="img/location-map/location-map-00.svg"
            alt="Bkg"
            draggable={false}
            onLoad={onImgLoad}
            style={{
              width: '100%',
              height: `${baseSize.h}px`,
              objectFit: 'cover',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
          <div className="aerial-map--frg" style={{ pointerEvents: 'auto' }}>
            {items}
          </div>
        </div>
      </MapInteractionCSS>

      <ViewMapMenu
        zoomInFunc={zoomIn}
        zoomOutFunc={zoomOut}
        maxScale={2}
        isZoomed={isZoomed}
        showToggle={false}
      />
    </div>
  );
}

export default function ViewMap() {
  return (
    <SidebarProvider>
      <MapContent />
    </SidebarProvider>
  );
}