import { GTag } from './GTag';
import { HotjarTag } from './HotjarTag';
import { LinkedinPartner } from './LinkedinPartner';
import { MetaPixelCode } from './MetaPixelCode';
import { TiktokAnalytics } from './TiktokAnalytics';

export function VendorScripts() {
  return (
    <>
      <GTag />
      <MetaPixelCode />
      <TiktokAnalytics />
      <LinkedinPartner />
      <HotjarTag />
    </>
  );
}
