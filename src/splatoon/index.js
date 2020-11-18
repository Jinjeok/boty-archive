// This feature needs /data/splja.json file.
let axios = require('axios');
const util = require('../util');
const fs = require('fs');
const mergeImg = require('merge-img');
const locale = require('../../data/locale.json');

module.exports = (client) => {
    if (command.command == '연어' && command.param == undefined) {
        const salmon = require('../../data/salmon.json');
        let salmonSync = fs.readFileSync('././data/salmon.json', 'utf8');
        let nowDate = new Date();
        let tempMonth = nowDate.getMonth() + 1;
        let tempDate = nowDate.getDate();
        if (1 >= tempMonth.toString().length) {
            tempMonth = `0${tempMonth}`;
        }
        if (1 >= tempDate.toString().length) {
            tempDate = `0${tempDate}`;
        }
        if (`${nowDate.getFullYear()}${tempMonth}${tempDate}` != salmon[0].date) {
            axios({
                method: 'get',
                url: 'https://splatoon2.ink/data/coop-schedules.json',
            }).then((res) => {
                console.log('data pushing');
                salmon[0].date = `${nowDate.getFullYear()}${tempMonth}${tempDate}`;
                delete salmon[1];
                let temp = salmon.filter(function (e) { return e != null; });
                temp.push(res.data);
                fs.writeFileSync('././data/salmon.json', JSON.stringify(temp, null, '\t'));
            }).catch((err) => {
                message.channel.send('Error occured : `' + err + '`');
            });
        }
        let tempWeapons = [];
        let tempMap;
        for (let i = 0; i < Object.keys(locale.weapons).length; i++) {
            for (let x = 0; x < 4; x++) {
                if (JSON.parse(salmonSync)[1].details[0].weapons[x].id == Object.keys(locale.weapons)[i]) {
                    if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '20') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[차저]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '10') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[롤러]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '50') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[머뉴버]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length <= 3) {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[슈터]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '11') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[붓]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '30') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[슬로셔]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '40') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[스피너]`);
                    } else if (JSON.parse(salmonSync)[1].details[0].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[0].weapons[x].id.slice(0, 2) == '60') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[셸터]`);
                    }
                }
            }
        }
        for (let z = 0; z < Object.keys(locale.coop_stages).length; z++) {
            if (JSON.parse(salmonSync)[1].details[0].stage.image == Object.keys(locale.coop_stages)[z]) {
                tempMap = Object.values(locale.coop_stages)[z].name;
            }
        }
        message.channel.send({
            embed: {
                thumbnail: {
                    url: `https://splatoon2.ink/assets/splatnet${JSON.parse(salmonSync)[1].details[0].stage.image}`
                },
                title: `이번 연어런`,
                color: '3447003',
                fields: [
                    {
                        name: `맵 : ${tempMap}`,
                        value: `진행 시간 : ${date.format(new Date(JSON.parse(salmonSync)[1].details[0].start_time * 1000), 'YYYY-MM-DD HH:mm')} ~ ${date.format(new Date(JSON.parse(salmonSync)[1].details[0].end_time * 1000), 'YYYY-MM-DD HH:mm')}\n무기 : ${tempWeapons}`
                    }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `Data Caching Time : ${JSON.parse(salmonSync)[0].date}`
                }
            }
        });
    }

    if (command.command == '연어' && command.param == '다음') {
        const salmon = require('../../data/salmon.json');
        let salmonSync = fs.readFileSync('././data/salmon.json', 'utf8');
        let nowDate = new Date();
        let tempMonth = nowDate.getMonth() + 1;
        let tempDate = nowDate.getDate();
        if (1 >= tempMonth.toString().length) {
            tempMonth = `0${tempMonth}`;
        }
        if (1 >= tempDate.toString().length) {
            tempDate = `0${tempDate}`;
        }
        if (`${nowDate.getFullYear()}${tempMonth}${tempDate}` != salmon[0].date) {
            axios({
                method: 'get',
                url: 'https://splatoon2.ink/data/coop-schedules.json',
            }).then((res) => {
                console.log('data pushing');
                salmon[0].date = `${nowDate.getFullYear()}${tempMonth}${tempDate}`;
                delete salmon[1];
                let temp = salmon.filter(function (e) { return e != null; });
                temp.push(res.data);
                fs.writeFileSync('././data/salmon.json', JSON.stringify(temp, null, '\t'));
            }).catch((err) => {
                message.channel.send('Error occured : `' + err + '`');
            });
        }
        let tempWeapons = [];
        let tempMap;
        for (let i = 0; i < Object.keys(locale.weapons).length; i++) {
            for (let x = 0; x < 4; x++) {
                if (JSON.parse(salmonSync)[1].details[1].weapons[x].id == Object.keys(locale.weapons)[i]) {
                    if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '20') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[차저]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '10') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[롤러]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '50') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[머뉴버]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length <= 3) {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[슈터]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '11') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[붓]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '30') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[슬로셔]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '40') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[스피너]`);
                    } else if (JSON.parse(salmonSync)[1].details[1].weapons[x].id.length == 4 && JSON.parse(salmonSync)[1].details[1].weapons[x].id.slice(0, 2) == '60') {
                        tempWeapons.push(`${locale.weapons[Object.keys(locale.weapons)[i]].name}[셸터]`);
                    }
                }
            }
        }
        for (let z = 0; z < Object.keys(locale.coop_stages).length; z++) {
            if (JSON.parse(salmonSync)[1].details[1].stage.image == Object.keys(locale.coop_stages)[z]) {
                tempMap = Object.values(locale.coop_stages)[z].name;
            }
        }
        message.channel.send({
            embed: {
                thumbnail: {
                    url: `https://splatoon2.ink/assets/splatnet${JSON.parse(salmonSync)[1].details[1].stage.image}`
                },
                title: `다음 연어런`,
                color: '3447003',
                fields: [
                    {
                        name: `맵 : ${tempMap}`,
                        value: `진행 시간 : ${date.format(new Date(JSON.parse(salmonSync)[1].details[1].start_time * 1000), 'YYYY-MM-DD HH:mm')} ~ ${date.format(new Date(JSON.parse(salmonSync)[1].details[1].end_time * 1000), 'YYYY-MM-DD HH:mm')}\n무기 : ${tempWeapons}`
                    }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `Data Caching Time : ${JSON.parse(salmonSync)[0].date}`
                }
            }
        });
    }
}