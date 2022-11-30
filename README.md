# JavaScriptInterop

---

## 의의

해당 repo는 Javascript Interop에 대해 다루고 있습니다

아래 두 링크를 참고 바랍니다.

- [ASP.NET Core Blazor의 .NET 메서드에서 JavaScript 함수 호출](https://learn.microsoft.com/ko-kr/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-7.0)
- [Blazor - JavaScript Isolation (ES6 Modules & Blazor)](https://www.c-sharpcorner.com/article/blazor-javascript-isolation-es6-modules-blazor/)

---

## Repo 설명

### 1. PrerenderedInterop1.razor

- 상기 MSLearn에 수록된 예제입니다.
- Blazor, Javascript와 렌더링간의 관계에 대해 파악할 수 있습니다.
- `firstRender` 이후 본문이 “Text after render”로 변합니다.
- /wwwroot/index.html의 `<head>`에서 관련 JS 코드를 확인할 수 있습니다.

### 2. PrerenderedInterop2.razor

- 상기 MSLearn에 수록된 예제입니다.
- `firstRender` 이후 `data`가 “Hello from interop call” 로 변합니다.
- PrerenderedInterop1과의 차이점 - `InvokeVoidAsync` & `InvokeAsync`
- /wwwroot/index.html의 `<head>`에서 관련 JS 코드를 확인할 수 있습니다.

### 3. Index.razor

- /wwwroot/index.html의 `<body>`에서 관련 JS 코드를 확인할 수 있습니다.
- firstRender 이후 index.html에서 설정해둔 showAlert 함수가 실행되어 “Hello, Awesome!”이 팝업창에 실행됩니다.

### 4. Index2.razor

- `IJSObjectReference`에 대해 간략하게 이해할 수 있는 예제입니다.
- 별도의 js 파일을 모듈화하여 가져와 해당 파일 내에 있는 함수를 사용가능합니다.
- 기본적인 작동방식은 Index.razor과 동일하므로 아래 두 방식을 비교하면 됩니다.
    - html 파일 내의 JS 함수 사용
    - JS 파일 내의 JS 함수 사용

### 5. CallJsExample6

- 상기 MSLearn에 수록된 예제입니다.
- 별도의 js 파일을 모듈화하여 가져와 해당 파일 내에 있는 함수를 사용가능합니다.

### 6. TimeDisplay

- 상기 Javascript Isolation에 수록된 예제입니다.
- 화면에 표시된 UTC Timezone을 버튼 클릭 시 현지 Timezone(KST)로 변환하게 하는 기능입니다.
- `ConvertStartTimeToLocal` JS 함수에 시간 변수를 삽입하여 `displayTime`으로 표시합니다.

### 7. GeolocationDisplay

- 자체 제작 예제입니다.
- 화면의 버튼을 클릭 시 사용자의 위치(위도 및 경도)가 표기됩니다.
- IJSRuntime, IJSObjectReference 등 상기 언급된 개념들을 종합적으로 이용한 예제입니다.
- /wwwroot/scripts/components/Geolocation.js 내 GetLatitude, GetLongtitude를 사용합니다.
- JS에서 [Geolocation API](https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)를 활용한 예제입니다.
- JS의 지역변수, 전역변수 개념을 이해하는데에 도움이 되는 예제입니다. (콘솔에 찍어보기)

---

## 정리

- JavaScript의 위치
    - `<head>` 태그에서 스크립트 로드(일반적으로 권장되지 않음)
        - wwwroot/index.html의 `<head>` 태그에 추가
    - `<body>` 태그에서 스크립트 로드
        - wwwroot/index.html의 `<body>` 태그에 추가
    - 외부 JS 파일(.js)에서 스크립트 로드
        - 스크립트 경로를 사용하여 wwwroot/index.html의 `<body>` 태그에 추가
    - Blazor 시작 후 스크립트 삽입
        
        ```html
        <body>
            ...
        
            <script src="_framework/blazor.{webassembly|server}.js" 
                autostart="false"></script>
            <script>
              Blazor.start().then(function () {
                var customScript = document.createElement('script');
                customScript.setAttribute('src', 'scripts.js');
                document.head.appendChild(customScript);
              });
            </script>
        </body>
        ```
        
- 주의사항
    - 미리 렌더링을 사용하도록 설정한 Blazor 앱의 경우 사전 렌더링 중에 JS를 호출할 수 없음
    - 웬만하면 JavaScript 함수를 불러오는 것은 `OnAfterRenderAsync` 에서 처리해야함
        - Blazor의 수명 구성 요소 주기 특성상 모든 렌더링이 다 된 다음에 인보크를 불러오지 않으면 에러가 발생하기 때문
        - 페이지 로드 시 한번만 불러오려고 하는거면 `firstrender` 변수로 if문을 작성하면 됨
- Blazor C#에서 JavaScript 함수 실행하는 방법
    - JS Runtime 확장을 추가한 다음 `InvokeVoidAsync`를 통해 함수 호출 가능
    - 순서
        - .razor 페이지 상단에 `@inject IJSEuntime JS` 를 추가
        - JavaScript에서 실행할 보이드 형태의 함수는 async로 만들고 이름을 복사
        - C#에서 `InvokeVoidAsync` 코드로 해당 파일을 호출
