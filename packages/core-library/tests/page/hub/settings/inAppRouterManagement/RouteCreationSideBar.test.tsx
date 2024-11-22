import { AuthorizedMenuResponse } from "../../../../../api/types";
import { RouteCreationSidebar } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/components/RouteCreationSidebar";
import { render, screen } from "../../../../common";


jest.mock("../../../../../config", () => ({
    getConfig: jest
        .fn()
        .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../../../hooks/useApi", () => ({
    useApiCallback: jest.fn().mockReturnValue({
        loading: false,
        result: {
            data: {},
        },
        error: undefined,
    }),
    useApi: jest.fn().mockReturnValue({
        loading: false,
        result: {
            data: {},
        },
        error: undefined,
    }),
}));

describe('RouterCreationSideBar', () => { 
    const mockFn = jest.fn()
    const mockData: AuthorizedMenuResponse = 
        {
          accountLevel: 0,
          id: "test-id",
          menuEnvironments: 0,
          menuItems: [{
            id:'test-id-2',
            icon:'test-icon',
            label:'test-label',
            menuId:'test-menu-id',
            parentId:'test-parent-id',
            path:'/path',
            children:[ 
                {
                    children:[],
                    id:'test-id-3',
                    icon:'test-icon-2',
                    label:'test-label-2',
                    menuId:'test-menu-id-2',
                    parentId:'test-parent-id=2',
                    path:'/path',
                }
            ]
          }],
          systemMenus: 0
        };

    it('it Should Render the sidebar with menus by default', ()=> {
        render(<RouteCreationSidebar menus={mockData}  onAddMenu={mockFn}  onDeleteMenu={mockFn}  onEditMenu={mockFn}/>)
        const sideBarCreation = screen.getByTestId('route-creation-sidebar')
        expect(sideBarCreation).toBeInTheDocument()
    })
})