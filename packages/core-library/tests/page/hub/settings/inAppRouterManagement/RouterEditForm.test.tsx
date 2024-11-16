import { AuthorizedMenuResponse } from "../../../../../api/types";
import { RouterEditForm } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/components/forms/RouterEditForm";
import { RouteCreationSidebar } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/routing/components/RouteCreationSidebar";
import { MenuItemType } from "../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/validation";
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

describe('RouterEditForm', () => { 
    const mockFn = jest.fn()
    const mockData: MenuItemType ={
            id:'test-id-2',
            icon:'test-icon',
            label:'test-label',
            menuId:'test-menu-id',
            parentId:'test-parent-id',
            path:'/path',
            children:[ 
                {
                    id:'test-id-3',
                    icon:'test-icon-2',
                    label:'test-label-2',
                    menuId:'test-menu-id-2',
                    parentId:'test-parent-id=2',
                    path:'/path',
                }
            ]
        }

    it('it Should Render the form when have a selected menus by default', ()=> {
        render(<RouterEditForm selectedMenuItem={mockData}  onSubmitEdit={mockFn}/>)
        const routerEditBlock = screen.getByTestId('router-edit-block')
        const routerEditForm = screen.getByTestId('router-edit-form')

        expect(routerEditBlock).toBeInTheDocument()
        expect(routerEditForm).toBeInTheDocument()
    })


    it('it Should render the select menu when selected menus is undefined', ()=> {
        render(<RouterEditForm   onSubmitEdit={mockFn}/>)
        const routerEditBlock = screen.getByTestId('router-edit-block')

        expect(routerEditBlock).toBeInTheDocument()
        expect(screen.getByText(/Select Menu Item/i)).toBeInTheDocument()
    })
})