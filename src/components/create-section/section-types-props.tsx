import { RadioGroup } from '@headlessui/react';
import { LoopIcon } from '@/components/icons/loop-icon';
import { SandClock } from '@/components/icons/sand-clock';
import { TagIcon } from '@/components/icons/tag-icon';

const SectionOptions = [
  {
    name: 'Memberships',
    subLabel:'Enable recurring charges monetisation towards your fanbase by enabling exclusive contents, webinar, etc.',
    value: '/create-membership',
    icon: <TagIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Scheduling/Webinar',
    subLabel:'Discovery Calls, Paid Coaching, 1:1 consultancy',
    value: '/create-calender',
    icon: <LoopIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Email/Contacts Collections',
    subLabel:'Collects information about your fanbase for future interaction.',
    value: '/create-lead-collection',
    icon: <SandClock className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
];

type SectionTypeProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SectionType({ value, onChange }: SectionTypeProps) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="grid grid-cols-3 gap-3"
    >
      {SectionOptions.map((item, index) => (
        <RadioGroup.Option value={item.value} key={index}>
          {({ checked }) => (
            <span
              className={`p-4 relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-solid bg-white text-center text-sm font-medium tracking-wider shadow-card transition-all hover:shadow-large dark:bg-light-dark ${
                checked ? 'border-brand' : 'border-white dark:border-light-dark'
              }`}
            >
              <span className="relative flex h-28 flex-col items-center justify-center gap-3 px-2 text-center text-xs uppercase sm:h-36 sm:gap-4 sm:text-sm">
                {item.icon}
              
                {item.name}
              </span>
              <p
              className='flex text-xs'
              >{item.subLabel}</p>
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
