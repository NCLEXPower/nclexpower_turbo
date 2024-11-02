import { usePageLoader } from "../../hooks"
import { act, renderHook } from "../common"

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../core", () => ({
     useRouter: () => ({
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
        loading: true 
    }),
}));

describe("usePageLoader", ()=>{
    let item = jest.fn()
    let handleRouteChangeStart = jest.fn()
    let handleRouteChangeComplete = jest.fn()
    
    it('should return isPageLoading as true', ()=>{
        const {result} = renderHook(() => usePageLoader())
        const {isPageLoading} = result.current
       
        act(() => {
            handleRouteChangeStart("handleRouteChangeStart", item);
        });
        expect(isPageLoading).toBe(false)
    })

    it('should set isPageLoading to false 2 seconds after routeChangeComplete is triggered', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => usePageLoader());
        const {isPageLoading} = result.current

        act(() => {
            handleRouteChangeComplete("handleRouteChangeComplete", item);
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(isPageLoading).toBe(false);
    });

    it('should set isPageLoading to true when handleRouteChangeStart is called', () => {
        const { result } = renderHook(() => usePageLoader());

        act(() => {
            result.current.handleRouteChangeStart();
        });

        expect(result.current.isPageLoading).toBe(true);
    });

    it('should set isPageLoading to false 2 seconds after handleRouteChangeComplete is called', () => {
        jest.useFakeTimers(); 
        const { result } = renderHook(() => usePageLoader());
        const {handleRouteChangeComplete, isPageLoading} = result.current

        act(() => {
            handleRouteChangeComplete();
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(isPageLoading).toBe(false);
    });

    it('should clear previous timeout when handleRouteChangeComplete is called multiple times', () => {
        const { result } = renderHook(() => usePageLoader());
        const {handleRouteChangeComplete, isPageLoading} = result.current

        act(() => {
            handleRouteChangeComplete();
        });

        act(() => {
           handleRouteChangeComplete();
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(isPageLoading).toBe(false);
    });

    afterEach(() => {
        jest.clearAllTimers(); 
        jest.clearAllMocks();  
    });
})