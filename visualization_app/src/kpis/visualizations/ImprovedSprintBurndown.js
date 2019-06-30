// @flow
'use strict';

import React from 'react';
import moment from 'moment';

import {
    LineChart, Line, ReferenceLine
} from 'recharts';

function ImprovedSprintBurndown(props) {
    var sprints = props.sprints;
    var inRechartsLayout = convertToRecharts(sprints);
    var sprintKeys = sprints.map((aSprint) => toStableKey(aSprint));
    const currentSprint = sprintKeys.pop();

    const linesOfpreviousSprints = sprintKeys.map((aSprint) =>
        <Line key={aSprint} stroke="#880000" type="monotone" dataKey={aSprint} dot={false} isAnimationActive={false} />
    );

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
            <ReferenceLine y={0} stroke="b" stroke="white"/>
            <Line key={currentSprint} type="monotone" dataKey={currentSprint} stroke="#ff0000" strokeWidth="2" dot={false} isAnimationActive={false} />
        </LineChart>
    );
}

function convertToRecharts(sprints) {
    var inRecharts = initialRechartsSetup(sprints[sprints.length - 1]);
    sprints.forEach((aSprint) => {
        extendRechartsSetup(aSprint, inRecharts);
    })
    return inRecharts;
}

function extendRechartsSetup(aSprint, inRecharts) {
    const sprintKey = toStableKey(aSprint);
    aSprint.measurements.forEach((value) => {
        var indexInRecharts = moment.duration(new moment(value.date).diff(new moment(aSprint.startedOn))).asDays();
        inRecharts[indexInRecharts][sprintKey] = value.numberStoryPoints;
    });
}

function initialRechartsSetup(lastSprint) {
    var inRecharts = [];
    var nextEntry = lastSprint.startedOn;
    var finalEntry = lastSprint.endsOn;
    while (nextEntry <= finalEntry) {
        var anEntry = {
            'date': nextEntry
        }
        inRecharts.push(anEntry);
        nextEntry = new moment(nextEntry).add(1, 'days').toDate();
    }
    return inRecharts;
}

function toStableKey(aSprint) {
    return aSprint.name + aSprint.startedOn.toDateString();
}

export default ImprovedSprintBurndown;