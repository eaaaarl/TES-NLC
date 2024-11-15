'use client';

export default function Loading() {
  return (
    <div className="preloader">
      <div className="loader-content">
        <h1 className="title">TES-NLC</h1>
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgb(5, 12, 43);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loader-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          color: white;
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          width: fit-content;
        }

        .loading-bar-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .loading-bar {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          width: fit-content;
          min-width: 100%;
        }

        .loading-progress {
          width: 100%;
          height: 100%;
          background: #0044ff;
          animation: progress 1.5s ease-in-out infinite;
          border-radius: 3px;
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}