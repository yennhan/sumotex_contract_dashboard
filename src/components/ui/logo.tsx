'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useLayout } from '@/lib/hooks/use-layout';
import lightLogo from '@/assets/images/logo-icon-white.png';
import darkLogo from '@/assets/images/logo-icon-black.png';
import routes from '@/config/routes';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import cn from 'classnames';

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    isMounted && (
      <AnchorLink
        href={{
          pathname:
            routes.home + (layout === LAYOUT_OPTIONS.MODERN ? '' : layout),
        }}
        className={cn('flex w-28 outline-none sm:w-32 4xl:w-36', className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <Image src={darkLogo} alt="SUMO.work" height={150} priority />
          )}
          {!isDarkMode && (
            <Image src={lightLogo} alt="SUMO.work" height={150} priority />
          )}
        </span>
      </AnchorLink>
    )
  );
}
