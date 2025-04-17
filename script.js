async function fetchJSONData() {
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi21dSzfLYGxjcZFhWt3_dl68TlDMLGnXJ3VetsQbynU57xNRTcIJPyBYXQr-04r7s-ZC2xipLMLVbh3mNRvGsT7xCbgdE2AYm8NydW-lza4HoPMVb5224hn9wmJiYJ-WNtQW5WNJp0CfguqRTMoaGtaz8GCxSnHbJMxApRWIqoHIMWtBoknyns2ZIe9Rzjor3bkbe-20iVT7CTJoqWUW_UWLjAJeb_5MwPwuQADXvzR5PGVU1V-SyZtpyogGIggDf-OuoMzh14mcaoVphtNyxyrFMS6A&lib=MZZ2LbslH7viUS2qS1RGgz6MxuYimDxfa'; // 省略
    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        console.log("取得したデータ:", jsonData); // ←ここ追加して中身を確認

        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            throw new Error("取得データが空、または配列ではありません。");
        }

        clearTable();
        generateTableHeader(jsonData);
        generateTableBody(jsonData);
    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
}


function clearTable() {
    document.getElementById('tableHeader').innerHTML = '';
    document.getElementById('tableBody').innerHTML = '';
}

const displayOrder = ['編成番号', '種別', '行先', '現在位置', '取得時間'];

function generateTableHeader(jsonData) {
    const tableHeader = document.getElementById('tableHeader');

    // 他の項目も含める
    const extraKeys = Object.keys(jsonData[0]).filter(key => !displayOrder.includes(key));
    const allKeys = [...displayOrder, ...extraKeys];

    allKeys.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // 保存して次でも使えるように
    window.currentHeaderOrder = allKeys;
}

function generateTableHeader() {
    const tableHeader = document.getElementById('tableHeader');
    tableHeader.innerHTML = '';

    const headers = ["TrainName", "Type", "For", "NowPos", "time"];
    const headerLabels = {
        TrainName: "編成番号",
        Type: "種別",
        For: "行先",
        NowPos: "現在位置",
        time: "取得時間"
    };

    headers.forEach(key => {
        const th = document.createElement('th');
        th.textContent = headerLabels[key] || key;
        tableHeader.appendChild(th);
    });
}

function generateTableBody(jsonData) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const keys = ["TrainName", "Type", "For", "NowPos", "time"];

    jsonData.forEach(item => {
        const tr = document.createElement('tr');
        keys.forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key] || "";
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}


fetchJSONData();
