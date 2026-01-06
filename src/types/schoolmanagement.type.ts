import type { SchoolByMonitorSchema } from "@/schemas/schoolmanagement.schema";
import z from "zod";

export type SchoolByMonitorType = z.infer<typeof SchoolByMonitorSchema>

export type SchoolAnswers = Record<string, string | null | undefined>;
export type DistrictInfo = {
    id: number;
    district: string;
    municipality: string;
    department: string;
};

export type SchoolInfo = {
    code: string;
    name: string;
    address?: string;
    directorName?: string;
    directorPhone?: string;
    districtId?: number;
    schoolEnrollment?: boolean;
    schoolSchedule?: boolean;
    teachingAssignment?: boolean;
    Districts?: DistrictInfo;
    sections?: {
      assignments: {
        id: number;
        teacherId: number;
        sectionId: number;
        subject: string;
        teacher: {
          id: number;
          dui: string;
          name: string;
          email: string;
          telephone: string;
          status: boolean;
        }
      }[]
    grade: string;
    id: number;
    schoolCode: string;
    sectionClass: string;
    shift: string;
    subtrack: string;
    track: string;
    }[]
};


export type SchoolInfoWithUsers = SchoolInfo & {
  userSchool?: Array<{
    id: number;
    userId: number;
    schoolCode: string;
    createdAt: string;
    user: {
      id: number;
      email: string;
      name: string;
      dui: string;
      telephone: string;
      roleId: number;
      role?: { id: number; name: string };
    };
  }>;
};


export type MonitorRow = {
    id: number;
    instrumentId: number;
    tutorId: number;
    schoolCode: string;
    payload: SchoolAnswers;
    submittedAt: string;
    utilitiesLink?: string | null;
    school?: SchoolInfo;
};

export type TableRow = {
    code: string;
    name: string;
    directorName: string;
    directorPhone: string;
    matricula: "Si" | "No" | "";
    cargaHoraria: "Si" | "No" | "";
    asignacionDocente: "Si" | "No" | "";
    district: string;
    municipality: string;
    department: string;
};

export type UpdateDirectorPayload = {
  schoolCode: number;
  roleId: number;
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

export type UpdateSubdirectorPayload = {
  schoolCode: number;
  roleId: number;
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

export type DirectorForm = {
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

export type SubdirectorForm = {
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

export type DeleteUserSchool = {
  userId: number;
  schoolCode: string;
};


