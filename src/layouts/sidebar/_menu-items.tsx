import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { LockIcon } from '@/components/icons/lock-icon';
import { TradingBotIcon } from '@/components/icons/trading-bot-icon';

export const defaultMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'NFTs Contracts',
    icon: <CompassIcon />,
    href: routes.listContract,
    dropdownItems: [
      {
        name: 'View Contracts',
        icon: <CompassIcon />,
        href: routes.listContract,
      },
      {
        name: 'Create Contract',
        icon: <PlusCircle />,
        href: routes.contract,
      },
    ],
  },
  // {
  //   name: 'Token Contract',
  //   icon: <VoteIcon />,
  //   href: routes.farms,
  // },
  {
    
    name: 'Scanner',
    icon: <CompassIcon />,
    href: routes.scanner,
  },
];
