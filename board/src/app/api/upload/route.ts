import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // FormData 추출
    const formData = await request.formData();
    const uploadFile = formData.get("uploadFile") as File;

    if (!uploadFile) {
      return NextResponse.json(
        { success: false, message: "파일이 없습니다." },
        { status: 400 }
      );
    }

    // 파일 크기 체크 (선택적)
    if (uploadFile.size > 10 * 1024 * 1024) { // 10MB 제한
      return NextResponse.json(
        { success: false, message: "파일 크기는 10MB를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    // 새 FormData 생성 (Spring 서버로 전달)
    const serverFormData = new FormData();
    serverFormData.append("uploadFile", uploadFile);

    // Spring 서버로 요청 전송
    const response = await fetch("http://localhost:8300/fileUpload", {
      method: "POST",
      body: serverFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || "파일 업로드에 실패했습니다." 
        },
        { status: response.status }
      );
    }

    // 성공 응답 처리
    const responseData = await response.json();
    
    return NextResponse.json({
      success: true,
      fileId: responseData.fileId,
      fileName: responseData.fileName,
      message: responseData.message || "파일 업로드 성공",
      file: {
        id: responseData.fileId,
        fileName: responseData.fileName
      }
    });
  } catch (error) {
    console.error("파일 업로드 오류:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "서버 오류가 발생했습니다." 
      },
      { status: 500 }
    );
  }
}