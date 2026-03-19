"use client";

import { useEffect, useRef, useState } from 'react';

interface LiteYouTubeProps {
  videoid: string;
  videotitle?: string;
  videoplay?: string;
  videoStartAt?: number;
  posterquality?: 'maxresdefault' | 'sddefault' | 'mqdefault' | 'hqdefault';
  posterloading?: 'lazy' | 'eager';
  nocookie?: boolean;
  autoload?: boolean;
  autopause?: boolean;
  short?: boolean;
  disablenoscript?: boolean;
  params?: string;
  playlistid?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LiteYouTube: React.FC<LiteYouTubeProps> = ({
  videoid,
  videotitle = "Video",
  videoplay = "Play",
  videoStartAt,
  posterquality = "hqdefault",
  posterloading = "lazy",
  nocookie = true,
  autoload = false,
  autopause = false,
  short = false,
  disablenoscript = false,
  params,
  playlistid,
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadComponent = async () => {
      try {
        await import('@justinribeiro/lite-youtube');

        if (!mounted || !ref.current) return;

        const liteYoutube = document.createElement('lite-youtube');
        liteYoutube.setAttribute('videoid', videoid);
        liteYoutube.setAttribute('videotitle', videotitle);
        liteYoutube.setAttribute('videoplay', videoplay);

        if (videoStartAt) liteYoutube.setAttribute('videoStartAt', videoStartAt.toString());
        liteYoutube.setAttribute('posterquality', posterquality);
        liteYoutube.setAttribute('posterloading', posterloading);
        if (nocookie) liteYoutube.setAttribute('nocookie', '');
        if (autoload) liteYoutube.setAttribute('autoload', '');
        if (autopause) liteYoutube.setAttribute('autopause', '');
        if (short) liteYoutube.setAttribute('short', '');
        if (disablenoscript) liteYoutube.setAttribute('disablenoscript', '');
        if (params) liteYoutube.setAttribute('params', params);
        if (playlistid) liteYoutube.setAttribute('playlistid', playlistid);

        liteYoutube.style.width = '100%';
        liteYoutube.style.height = '100%';
        liteYoutube.style.aspectRatio = '16/9';

        if (className) {
          liteYoutube.className = className;
        }

        liteYoutube.addEventListener('liteYoutubeIframeLoaded', () => {
          setIsLoaded(true);
        });

        liteYoutube.addEventListener('error', () => {
          setHasError(true);
        });

        ref.current.innerHTML = '';
        ref.current.appendChild(liteYoutube);

      } catch (error) {
        console.error('Error loading lite-youtube:', error);
        setHasError(true);
      }
    };

    loadComponent();

    return () => {
      mounted = false;
    };
  }, [videoid, videotitle, videoplay, videoStartAt, posterquality, posterloading, nocookie, autoload, autopause, short, disablenoscript, params, playlistid, className]);

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '16/9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          borderRadius: '8px',
          ...style
        }}
      >
        <a
          href={`https://www.youtube.com/watch?v=${videoid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-4 text-white hover:text-red-400 transition-colors"
        >
          <div className="w-0 h-0 border-l-[30px] border-l-red-500 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent"></div>
          <span className="text-center px-4">Ver en YouTube: {videotitle}</span>
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        ...style
      }}
    />
  );
};
