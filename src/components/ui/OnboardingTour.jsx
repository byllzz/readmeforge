import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";

import * as JoyrideModule from "react-joyride";
const Joyride = JoyrideModule.default || JoyrideModule.Joyride;
const { STATUS } = JoyrideModule;

const STEPS = [
  {
    target: ".block-palette",
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🧱 Choose blocks</h3>
        <p className="text-sm text-gray-600">
          Pick from 11 ready‑made blocks — Title, Badges, Features, and more.
          Each block is a section of your README.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: ".block-list-item",
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">➕ Add a block</h3>
        <p className="text-sm text-gray-600">
          Click any block type to add it to your README. You can always reorder
          or remove it later.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: ".sortable-block-list",
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">🔄 Reorder blocks</h3>
        <p className="text-sm text-gray-600">
          Drag and drop blocks to rearrange them. The live preview updates
          instantly.
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    disableScrolling: false,
  },
  {
    target: ".markdown-preview-container",
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">👁️ Live preview</h3>
        <p className="text-sm text-gray-600">
          See your README rendered in real time. Switch between Preview and Code
          view using the tabs above.
        </p>
      </div>
    ),
    placement: "left",
    disableBeacon: true,
  },
  {
    target: ".action-toolbar",
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-2">📦 Export instantly</h3>
        <p className="text-sm text-gray-600">
          Copy the raw Markdown or download a complete README.md file with one
          click. Ready to commit!
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
];

const OnboardingTour = forwardRef(({ onComplete }, ref) => {
  const [run, setRun] = useState(false);
  const joyrideRef = useRef();
  
  useImperativeHandle(ref, () => ({
    restart: () => {
      localStorage.removeItem("readmeforge:onboarded");
      setRun(false); // Stop any lingering tour state
      // Restart after a tiny delay to reset Joyride's internal engine
      setTimeout(() => setRun(true), 100);
    },
  }));

  useEffect(() => {
    // Changed to localStorage so it permanently remembers the user did the tour
    const hasSeen = localStorage.getItem("readmeforge:onboarded");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setRun(true);
        localStorage.setItem("readmeforge:onboarded", "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
      if (onComplete) onComplete();
    }
  };

  return (
    <Joyride
      ref={joyrideRef}
      steps={STEPS}
      run={run}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc
      styles={{
        options: {
          primaryColor: "#3b82f6",
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          arrowColor: "#ffffff",
          zIndex: 1000,
          disableBeacon: true,
        },
        spotlight: {
          borderRadius: "8px",
        },
        tooltipContainer: {
          textAlign: "left",
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Got it!",
        next: "Next",
        skip: "Skip",
      }}
    />
  );
});

export default OnboardingTour;
