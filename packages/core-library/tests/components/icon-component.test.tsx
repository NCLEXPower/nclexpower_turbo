import React from "react";
import { render, screen } from "../common";
import { IconComponent } from "../../components/GenericDrawerLayout/utils/icon-component";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

const renderIcon = (iconName: string, open = true) => {
  render(<React.Fragment>{IconComponent(iconName, open)}</React.Fragment>);
};

describe("IconComponent", () => {
  it("should render DashboardIcon when 'DashboardIcon' is passed", () => {
    renderIcon("DashboardIcon");
    const icon = screen.getByTestId("DashboardIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render FeedIcon when 'FeedIcon' is passed", () => {
    renderIcon("FeedIcon");
    const icon = screen.getByTestId("FeedIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render PersonIcon when 'PersonIcon' is passed", () => {
    renderIcon("PersonIcon");
    const icon = screen.getByTestId("PersonIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render SettingsIcon when 'SettingsIcon' is passed", () => {
    renderIcon("SettingsIcon");
    const icon = screen.getByTestId("SettingsIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render SourceIcon when 'SourceIcon' is passed", () => {
    renderIcon("SourceIcon");
    const icon = screen.getByTestId("SourceIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render QuestionManagementIcon when 'QuestionManagementIcon' is passed", () => {
    renderIcon("QuestionManagementIcon");
    const icon = screen.getByTestId("QuestionManagementIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render ResultsIcon when 'ResultsIcon' is passed", () => {
    renderIcon("ResultsIcon");
    const icon = screen.getByTestId("ResultsIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render DeleteIcon when 'DeleteIcon' is passed", () => {
    renderIcon("DeleteIcon");
    const icon = screen.getByTestId("DeleteIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render ApprovalIcon when 'ApprovalIcon' is passed", () => {
    renderIcon("ApprovalIcon");
    const icon = screen.getByTestId("ApprovalIcon");
    expect(icon).toBeInTheDocument();
  });

  it("should render keySquare when 'keySquare' is passed", () => {
    renderIcon("keySquare");
    const icon = screen.getByTestId("keySquare");
    expect(icon).toBeInTheDocument();
  });

  it("should render TRDSquare when 'TRDSquare' is passed", () => {
    renderIcon("TRDSquare");
    const icon = screen.getByTestId("TRDSquare");
    expect(icon).toBeInTheDocument();
  });

  it("should render DotsIcon when 'DotsIcon' is passed", () => {
    renderIcon("DotsIcon");
    const icon = screen.getByTestId("DotsIcon");
    expect(icon).toBeInTheDocument();
  });
});
