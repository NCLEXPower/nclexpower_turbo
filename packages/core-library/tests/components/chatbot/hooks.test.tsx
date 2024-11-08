import { useRef } from "react";
import { ChatBotOptionResponse } from "../../../types/chatbot";
import {
  useChatBotConversation,
  useCloseOnEscClick,
  useTrapContainerFocus,
} from "../../../components/chatbot/hooks";
import { useApiCallback } from "../../../hooks";
import { act, fireEvent, render, renderHook, screen } from "../../common";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));
jest.mock("../../../hooks/useApi");

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const DEFAULT_OPTION: ChatBotOptionResponse = {
  answerText: "Answer text",
  optionText: "Option text",
  optionKey: "opt",
  subsequentOptions: [
    { optionKey: "opt1", optionText: "Option 1" },
    { optionKey: "opt2", optionText: "Option 2" },
  ],
};

describe("ChatBot hooks", () => {
  describe("useChatBotConversation", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should conversation by executing API callback", () => {
      const mockApiCallback = {
        loading: false,
        execute: jest.fn(),
        result: { data: null },
      } as any;
      jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

      const { result } = renderHook(() => useChatBotConversation());

      act(() => {
        result.current.start();
      });

      expect(mockApiCallback.execute).toHaveBeenCalled();
      expect(result.current.loading).toBe(true);
    });

    it("selects an option by executing API callback with option key", () => {
      const mockApiCallback = {
        loading: false,
        execute: jest.fn(),
        result: { data: DEFAULT_OPTION },
      } as any;
      jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

      const { result } = renderHook(() => useChatBotConversation());

      act(() => {
        result.current.selectOption("opt1");
      });

      expect(mockApiCallback.execute).toHaveBeenCalledWith("opt1");
      expect(result.current.selectedOptionText).toBe("Option 1");
      expect(result.current.loading).toBe(true);
    });

    it("updates allOptions when a new option is returned from the API", async () => {
      const mockApiCallback = {
        loading: false,
        execute: jest.fn(),
        result: { data: DEFAULT_OPTION },
      } as any;
      jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

      const { result, rerender } = renderHook(() => useChatBotConversation());

      act(() => {
        mockApiCallback.result.data = DEFAULT_OPTION;
        rerender();
      });

      expect(result.current.allOptions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...DEFAULT_OPTION,
            timestamp: expect.any(Date),
          }),
        ])
      );
    });

    it("sets loading to false when a new option is returned from the API", async () => {
      const mockApiCallback = {
        loading: false,
        execute: jest.fn(),
        result: { data: DEFAULT_OPTION },
      } as any;
      jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

      const { result, rerender } = renderHook(() => useChatBotConversation());

      act(() => {
        mockApiCallback.result.data = DEFAULT_OPTION;
        rerender();
      });

      expect(result.current.loading).toBe(false);
    });

    it("sets selectedOptionText to undefined when a new option is returned from the API", async () => {
      const mockApiCallback = {
        loading: false,
        execute: jest.fn(),
        result: { data: DEFAULT_OPTION },
      } as any;
      jest.mocked(useApiCallback).mockReturnValue(mockApiCallback);

      const { result, rerender } = renderHook(() => useChatBotConversation());

      act(() => {
        mockApiCallback.result.data = DEFAULT_OPTION;
        rerender();
      });

      expect(result.current.selectedOptionText).toBe(undefined);
    });
  });

  describe("useCloseOnClick", () => {
    it("does call close on load", () => {
      const closeFn = jest.fn();
      const { result } = renderHook(() => useCloseOnEscClick(true, closeFn));
      expect(closeFn).not.toBeCalled();
    });
  });

  describe("useTrapContainerFocus", () => {
    const TestComponent = () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const isOpen = true;
      useTrapContainerFocus(isOpen, containerRef);

      return (
        <div ref={containerRef}>
          <button>First Button</button>
          <button>Second Button</button>
          <input type="text" role="input" />
        </div>
      );
    };

    it("traps focus inside the container when open", () => {
      const { container } = render(<TestComponent />);
      const buttons = screen.queryAllByRole("button");
      const input = screen.queryAllByRole("input")[0];

      act(() => {
        buttons[0].focus();
        fireEvent.keyDown(container, { key: "Tab" });
      });

      expect(document.activeElement).toBe(buttons[0]);

      act(() => {
        fireEvent.keyDown(container, { key: "Tab", shiftKey: true });
      });

      expect(document.activeElement).toBe(input);
    });
  });
});
