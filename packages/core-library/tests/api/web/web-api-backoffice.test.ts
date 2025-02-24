import axios from "axios";
import { WebApiBackOffice } from "../../../api/web/web-api-backoffice";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const service = new WebApiBackOffice(mockedAxios, mockedAxios);

describe("Service API Calls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all sections", async () => {
    const mockResponse = [{ id: "1", name: "Section 1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await service.getAllSections();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/v2/content/BaseContent/get-sections");
    expect(result.data).toEqual(mockResponse);
  });

  it("should fetch section list by type", async () => {
    const params = { type: "example", sectionType: "document" };
    const mockResponse = [{ id: "2", name: "Section 2" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await service.getSectionListByType(params);

    expect(mockedAxios.get).toHaveBeenCalledWith(
        `/api/v2/content/BaseContent/get-sections?sectionType=document&type=example`
    );
    expect(result.data).toEqual(mockResponse);
  });

  it("should delete a section", async () => {
    const sectionId = "123";
    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    const result = await service.deleteSectionList(sectionId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`/api/v2/content/BaseContent/${sectionId}`);
    expect(result.status).toBe(200);
  });

  it("should create a section", async () => {
    const params = {
      sectionTitle: "New Section",
      sectionType: "Type A",
      sectionData: [{ title: "Test", link: [], contentArea: "Area" }],
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 201 });

    const result = await service.createSection(params);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/v2/content/BaseContent/create-section",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    expect(result.status).toBe(201);
  });

  it("should update a section", async () => {
    const params = {
      sectionId: "123",
      sectionTitle: "Updated Section",
      sectionType: "Type B",
      sectionDataId: "456",
      title: "Updated Title",
    };

    mockedAxios.put.mockResolvedValueOnce({ status: 200 });

    const result = await service.updateSectionById(params);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `/api/v2/content/BaseContent/${params.sectionId}`,
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    expect(result.status).toBe(200);
  });

  it("should create a program", async () => {
    const params = {
      title: "New Program",
      programImage: [new File(["content"], "image.png", { type: "image/png" })],
      programType: 1,
      stringifiedSections: [],
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 201 });

    const result = await service.createPrograms(params);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/v2/content/BaseContent/create-program",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    expect(result.status).toBe(201);
  });

  it("should fetch all programs", async () => {
    const mockResponse = [{ id: "1", title: "Program 1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await service.getAllPrograms();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/v2/content/BaseContent/get-internal-programs");
    expect(result.data).toEqual(mockResponse);
  });

  it("should update a program", async () => {
    const params = {
      id: "1",
      title: "Updated Program",
      programImage: [new File(["content"], "image.png", { type: "image/png" })],
      stringifiedSections: [],
      programType: 2,
    };

    mockedAxios.put.mockResolvedValueOnce({ status: 200 });

    const result = await service.updatePrograms(params);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/api/v2/content/BaseContent/update-program",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    expect(result.status).toBe(200);
  });
});
