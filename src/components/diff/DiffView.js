import { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Element, animateScroll as scroll, scroller, Events } from 'react-scroll'
import { ScrollSync, ScrollSyncPane } from '../scroll-sync'; // react-scroll-sync';

export default function DiffView(props) {

    const [state, setState] = useState({synchronised:true, scrolling:"chill"});

    useEffect(() => {
        console.log("useEffect", state)
        if (state.scrolling === "chill") {
            return
        }
        if (state.scrolling === "left") {
            const scrollABit = new Promise((resolve, reject) => {

                console.log("scrollabit left")
                Events.scrollEvent.register('end', () => {
                    resolve();
                    Events.scrollEvent.remove('end');
                });

                scroll.scrollMore(100, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    containerId: "containerLeft"
                });

            });
            scrollABit.then(() => setState({synchronised:true,scrolling:"chill"}));
            return
        }
        if (state.scrolling === "right") {
            const scrollABit = new Promise((resolve, reject) => {

                console.log("scrollabit right")
                Events.scrollEvent.register('end', () => {
                    resolve();
                    Events.scrollEvent.remove('end');
                });

                scroll.scrollMore(100, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    containerId: "containerRight"
                });

            });
            scrollABit.then(() => setState({synchronised:true,scrolling:"chill"}));
        }

    }, [state]); // <- add the count variable here

    const debug = [
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button
                variant="contained"
                onClick={() => setState({synchronised:false,scrolling:"left"})}>
                Scroll Left
            </Button>
            <Button
                onClick={() => setState({synchronised:true,scrolling:state.scrolling})}
                variant="contained">
                sync
            </Button>
            <Button
                onClick={() => setState({synchronised:false,scrolling:state.scrolling})}
                variant="contained">
                unsync
            </Button>
            <Button
                variant="contained"
                onClick={() => setState({synchronised:false,scrolling:"right"})}>
                Scroll Right
            </Button>
        </Stack>
    ]
    const body = [
        <ScrollSync enabled={state.synchronised}> 
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <ScrollSyncPane>
                    <div id="containerLeft" style={{overflow: 'auto', height: '400px', direction: 'rtl'}}>
                    <div style={{direction: 'ltr'}}>
                        {props.contentLeft}
                    </div>
                    </div>
                </ScrollSyncPane>
                <div style={{width:200}} />
                <ScrollSyncPane>
                    <div id="containerRight" style={{overflow: 'auto', height: '400px'}}>
                        {props.contentRight}
                    </div>
                </ScrollSyncPane>
            </Stack>
        </ScrollSync> 
    ]

    return props.debug ? debug.concat(body) : body 
};
