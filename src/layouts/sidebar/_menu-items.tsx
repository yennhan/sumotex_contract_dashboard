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
    name: 'Store',
    icon: <HomeIcon />,
    href: routes.store,
  },
  {
    name: 'Contract',
    icon: <FarmIcon />,
    href: routes.profile,
  },
  {
    name: 'Scanner',
    icon: <CompassIcon />,
    href: routes.profile,
  },
];

export const MinimalMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Live Pricing',
    icon: <LivePricing />,
    href: routes.livePricing,
  },
  // {
  //   name: 'NFTs',
  //   icon: <CompassIcon />,
  //   href: routes.search,
  //   dropdownItems: [
  //     {
  //       name: 'Explore NFTs',
  //       icon: <CompassIcon />,
  //       href: routes.search,
  //     },
  //     {
  //       name: 'Create NFT',
  //       icon: <PlusCircle />,
  //       href: routes.createNft,
  //     },
  //     {
  //       name: 'NFT Details',
  //       icon: <DiskIcon />,
  //       href: routes.nftDetails,
  //     },
  //   ],
  // },
  {
    name: 'Pages',
    icon: <VoteIcon />,
    href: routes.pages,
    dropdownItems: [
      {
        name: 'Authentication',
        icon: <LockIcon className="w-[18px]" />,
        href: routes.signIn,
        dropdownItems: [
          {
            name: 'Sign in',
            href: routes.signIn,
          },
          {
            name: 'Sign up',
            href: routes.signUp,
          },
          {
            name: 'Reset pin',
            href: routes.resetPin,
          },
          {
            name: 'Forget password',
            href: routes.forgetPassword,
          },
        ],
      },
    ],
  },
];
