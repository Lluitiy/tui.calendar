import { h } from 'preact';

import { Story } from '@storybook/preact';

import { Day } from '@src/components/view/day';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { addDate, setTimeStrToDate } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth, createRandomEvents } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';

export default { title: 'Views/DayView', component: Day };

function createTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return createRandomEvents('week', start, end).map((event) => EventModel.create(event));
}

function createDayEvents() {
  const today = new TZDate();
  const yesterday = addDate(today, -1);
  const tomorrow = addDate(today, 1);
  const events: EventModelData[] = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'event1',
      category: 'allday',
      isAllday: true,
      start: yesterday,
      end: today,
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'event2',
      category: 'allday',
      isAllday: true,
      start: today,
      end: today,
    },
    {
      id: '3',
      calendarId: 'cal1',
      title: 'event3',
      category: 'allday',
      isAllday: true,
      start: today,
      end: tomorrow,
    },
    {
      id: '4',
      calendarId: 'cal1',
      title: 'long time event',
      category: 'time',
      isAllday: false,
      start: setTimeStrToDate(yesterday, '10:00'),
      end: setTimeStrToDate(today, '06:00'),
    },
    {
      id: '5',
      calendarId: 'cal1',
      title: 'short time event',
      category: 'time',
      isAllday: false,
      start: setTimeStrToDate(today, '04:00'),
      end: setTimeStrToDate(today, '06:00'),
    },
  ];

  return events.map((event) => EventModel.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <Day />
  </ProviderWrapper>
);

export const basic = Template.bind({});

export const randomEvents = Template.bind({});
randomEvents.args = {
  events: [...createRandomEventModelsForMonth(40), ...createTimeGridEvents()],
  options: { useCreationPopup: true, useDetailPopup: true },
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  options: { useCreationPopup: true, useDetailPopup: true },
  events: createDayEvents(),
};
