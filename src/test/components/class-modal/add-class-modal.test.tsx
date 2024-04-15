import ViewClassPage from "@/app/(dashboard)/classes/page";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";



jest.mock("next-auth/react");

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe("CreateClass", () => {



    it ("should correctly render add create class", async () => {
        render(
            <ViewClassPage />
        );
        screen.debug();
    })

    
})