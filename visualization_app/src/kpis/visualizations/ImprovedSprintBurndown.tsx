import * as React from 'react';
import * as Moment from 'moment';

import {
    LineChart, Line, ReferenceLine,XAxis
} from 'recharts';

function ImprovedSprintBurndown(props:any) {
    const sprints = props.sprints;
    const inRechartsLayout = convertToRecharts(sprints);
    const sprintKeys = sprints.map((aSprint:any) => toStableKey(aSprint));
    const currentSprint = sprintKeys.pop();

    const linesOfpreviousSprints = sprintKeys.map((aSprint:any) =>
        <Line key={aSprint} stroke="#880000" type="monotone" dataKey={aSprint} dot={false} isAnimationActive={false} />
    );

    const dayOneWeekBeforeFinalDay = inRechartsLayout[inRechartsLayout.length-7-1].dateFormated;

    return (
        <LineChart
            width={960}
            height={500}
            data={inRechartsLayout}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            {linesOfpreviousSprints}
            <Line key={currentSprint} type="monotone" dataKey={currentSprint} stroke="#ff0000" strokeWidth="2" dot={false} isAnimationActive={false} />
            <XAxis dataKey="dateFormated" />
            <ReferenceLine x={dayOneWeekBeforeFinalDay} stroke="white" strokeDasharray="5 5" label="a week before" />

        </LineChart>
    );
}

function convertToRecharts(sprints:any) {
    const inRecharts = initialRechartsSetup(sprints[sprints.length - 1]);
    sprints.forEach((aSprint:any) => {
        extendRechartsSetup(aSprint, inRecharts);
    });
    return inRecharts;
}

function extendRechartsSetup(aSprint:any, inRecharts:any) {
    const sprintKey = toStableKey(aSprint);
    aSprint.measurements.forEach((value:any) => {
        const indexInRecharts = Moment.duration(Moment(value.date).diff(Moment(aSprint.startedOn))).asDays();
        inRecharts[indexInRecharts][sprintKey] = value.numberStoryPoints;
    });
}

function initialRechartsSetup(lastSprint:any) {
    const inRecharts = [];
    let nextEntry = lastSprint.startedOn;
    const finalEntry = lastSprint.endsOn;
    while (nextEntry <= finalEntry) {
        const anEntry = {
            date: nextEntry,
            dateFormated : Moment(nextEntry).format('DD.MM')
        };
        inRecharts.push(anEntry);
        nextEntry = Moment(nextEntry).add(1, 'days').toDate();
    }
    return inRecharts;
}

function toStableKey(aSprint:any) {
    return aSprint.name + aSprint.startedOn.toDateString();
}

export default ImprovedSprintBurndown;
