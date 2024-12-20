import { act, renderHook } from '@testing-library/react';
import { useCountdown } from '../../hooks/useCountdown';


describe('useCountdown', () => {
    it('Should return duration 00:00:00:00 and time remaining in 00:00:00:00: ', () => {
        const { result } = renderHook(() => useCountdown({ duration: "00:00:00:00", timeRemaining: "00:00:00:00" }))
        const { duration, timeRemaining } = result.current

        expect(duration).toBe("00 : 00 : 00 : 00")
        expect(timeRemaining).toBe("00 : 00 : 00 : 00")
    })

    it('Time duration should not be 00:00:05 and time remaining is 00:00:00 after 5 seconds ', () => {
        const { result } = renderHook(() => useCountdown({ duration: "00:00:00", timeRemaining: "00:00:05" }))
        const { duration, timeRemaining } = result.current

        jest.useFakeTimers()
        act(() => {
            jest.advanceTimersByTime(5000)
        })

        expect(result.current.duration).not.toBe("00 : 00 : 05");
        expect(result.current.timeRemaining).not.toBe("00 : 00 : 00");

        jest.useRealTimers()
    })

    it('Time duration should be 00:00:00:05 and time remaining is 00:00:00:00 after 5 seconds ', () => {
        jest.useFakeTimers();

        const { result } = renderHook(() => useCountdown({ duration: "00:00:00:00", timeRemaining: "00:00:00:05" }));

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(result.current.duration).toBe("00 : 00 : 00 : 05");
        expect(result.current.timeRemaining).toBe("00 : 00 : 00 : 00");

        jest.useRealTimers();
    });


})
