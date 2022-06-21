import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE || '123');

export const useGAEventsTracker = (category: string) => {
  const trackEvent = (action: string, label: string) => {
    ReactGA.event({
      category,
      action,
      label,
    });
  };
  return trackEvent;
};
