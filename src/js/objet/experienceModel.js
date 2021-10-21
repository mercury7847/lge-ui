(function() {

    //제품 정보 셋팅
    var configData = {

            modelConfig: [{
                    name: "냉장고",
                    id: "refrigerator",
                    leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator.png",
                    refrigeratorType: [{
                        typeName: "얼음정수기",
                        typ: "refrigerator1",
                        typModel: [{
                            name: "노크온 매직스페이스", //210719 BTOCSITE-2346 제품 추가 - 제품명 수정
                            defaultCode: "W821AAA453",
                            subModel: [{
                                modelCode: "W821AAA463",
                                magicSpace: 1,
                                energy: 3,
                                knockOn: true,
                                voiceChk : "O",
                                defaultPrice: "1,000,000",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }],
                            leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_W821AAA453.png",
                            simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_W821AAA453.png",
                            defaultPrice: "1,000,000",
                            memberDiscount: "0",
                            directDiscount: "0",
                            magicSpace: 1,
                            energy: 3,
                            knockOn: true,
                            voiceChk : "X",
                            door: {
                                count: 3,
                                door1: {
                                    name: "얼음정수기 상단(좌)",
                                    code: "D870JT",
                                    defaultPrice: "100,000",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door2: {
                                    name: "하단(좌)",
                                    code: "D870BB",
                                    defaultPrice: "100,000",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door3: {
                                    name: "하단(우)",
                                    code: "D870BB",
                                    defaultPrice: "100,000",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                }
                            },
                            doorColorData: [{
                                doorMaterial: {
                                    name: "페닉스",
                                    enName: "FENIX",
                                    code: "F",
                                    desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                    doorColor: [{
                                        name: "보타닉",
                                        code: "BT",
                                        mixingCode: "FBT"

                                    }, {
                                        name: "샌드",
                                        code: "SD",
                                        mixingCode: "FSD"
                                    }, {
                                        name: "스톤",
                                        code: "ST",
                                        mixingCode: "FST"
                                    }]
                                }

                            }, {
                                doorMaterial: {
                                    name: "솔리드",
                                    enName: "Solid Metal",
                                    code: "S",
                                    desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                    doorColor: [{
                                        name: "맨해튼 미드나잇",
                                        code: "MT",
                                        mixingCode: "SMT"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "SSV"
                                    }, {
                                        name: "그린",
                                        code: "GR",
                                        mixingCode: "SGR"
                                    }]
                                }
                            }, {
                                doorMaterial: {
                                    name: "미스트",
                                    enName: "Mist Glass",
                                    code: "G",
                                    desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                    doorColor: [{
                                        name: "베이지",
                                        code: "BE",
                                        mixingCode: "GBE"
                                    }, {
                                        name: "핑크",
                                        code: "PK",
                                        mixingCode: "GPK"
                                    }, {
                                        name: "민트",
                                        code: "MN",
                                        mixingCode: "GMN"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "GSV"
                                    }, {
                                        name: "레드우드",
                                        code: "RD",
                                        mixingCode: "GRD"
                                    }, {
                                        name: "클레이 브라운",
                                        code: "CL",
                                        mixingCode: "GCL"
                                    }]
                                    //210719 BTOCSITE-2346 신규 컬러 추가 - 레드우드,클레이브라운
                                }
                            }, {
                                doorMaterial: {
                                    name: "네이쳐",
                                    enName: "Nature Metal",
                                    code: "M",
                                    desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                    doorColor: [{
                                        name: "그레이",
                                        code: "GY",
                                        mixingCode: "MGY"
                                    }, {
                                        name: "블랙",
                                        code: "BK",
                                        mixingCode: "MBK"
                                    }, {
                                        name: "화이트",
                                        code: "WH",
                                        mixingCode: "MWH"
                                    }]
                                }
                            }]
                        },{ //210719 BTOCSITE-2346 제품 추가 - 얼정냉 > 매직 스페이스(신규제품)
                            name: "매직 스페이스",
                            defaultCode: "W821AAA153",
                            leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_W821AAA153.png",
                            simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_W821AAA153.png",
                            defaultPrice: "1,000,000",
                            memberDiscount: "0",
                            directDiscount: "0",
                            magicSpace: 1,
                            energy: 3,
                            knockOn: true,
                            voiceChk : "",
                            door: {
                                count: 4,
                                door1: {
                                    name: "얼음정수기 상단(좌)",
                                    code: "D870JT",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door2: {
                                    name: "상단(우)",
                                    code: "D870TT",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door3: {
                                    name: "하단(좌)",
                                    code: "D870BB",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door4: {
                                    name: "하단(우)",
                                    code: "D870BB",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                }
                            },
                            doorColorData: [{
                                doorMaterial: {
                                    name: "페닉스",
                                    enName: "FENIX",
                                    code: "F",
                                    desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                    doorColor: [{
                                        name: "보타닉",
                                        code: "BT",
                                        mixingCode: "FBT"

                                    }, {
                                        name: "샌드",
                                        code: "SD",
                                        mixingCode: "FSD"
                                    }, {
                                        name: "스톤",
                                        code: "ST",
                                        mixingCode: "FST"
                                    }]
                                }

                            }, {
                                doorMaterial: {
                                    name: "솔리드",
                                    enName: "Solid Metal",
                                    code: "S",
                                    desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                    doorColor: [{
                                        name: "맨해튼 미드나잇",
                                        code: "MT",
                                        mixingCode: "SMT"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "SSV"
                                    }, {
                                        name: "그린",
                                        code: "GR",
                                        mixingCode: "SGR"
                                    }]
                                }
                            }, {
                                doorMaterial: {
                                    name: "미스트",
                                    enName: "Mist Glass",
                                    code: "G",
                                    desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                    doorColor: [{
                                        name: "베이지",
                                        code: "BE",
                                        mixingCode: "GBE"
                                    }, {
                                        name: "핑크",
                                        code: "PK",
                                        mixingCode: "GPK"
                                    }, {
                                        name: "민트",
                                        code: "MN",
                                        mixingCode: "GMN"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "GSV"
                                    }, {
                                        name: "레드우드",
                                        code: "RD",
                                        mixingCode: "GRD"
                                    }, {
                                        name: "클레이 브라운",
                                        code: "CL",
                                        mixingCode: "GCL"
                                    }]
                                    //210719 BTOCSITE-2346 신규 컬러 추가 - 레드우드,클레이브라운
                                }
                            }, {
                                doorMaterial: {
                                    name: "네이쳐",
                                    enName: "Nature Metal",
                                    code: "M",
                                    desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                    doorColor: [{
                                        name: "그레이",
                                        code: "GY",
                                        mixingCode: "MGY"
                                    }, {
                                        name: "블랙",
                                        code: "BK",
                                        mixingCode: "MBK"
                                    }, {
                                        name: "화이트",
                                        code: "WH",
                                        mixingCode: "MWH"
                                    }]
                                }
                            }]
                        }]
                    }, {
                        typeName: "상냉장/하냉동",
                        typ: "refrigerator2",
                        typModel: [
                            /*{
                        name: "노크온 더블 매직스페이스",
                        defaultCode: "M871AAA551",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA551.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M871AAA551.png",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                        magicSpace: 2,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }
                        },
                        doorColorData: [{
                            doorMaterial: {
                                name: "페닉스",
                                enName: "FENIX",
                                code: "F",
                                desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                doorColor: [{
                                    name: "보타닉",
                                    code: "BT",
                                    mixingCode: "FBT"

                                }, {
                                    name: "샌드",
                                    code: "SD",
                                    mixingCode: "FSD"
                                }, {
                                    name: "스톤",
                                    code: "ST",
                                    mixingCode: "FST"
                                }]
                            }

                        }, {
                            doorMaterial: {
                                name: "솔리드",
                                enName: "Solid Metal",
                                code: "S",
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                doorColor: [{
                                    name: "맨해튼 미드나잇",
                                    code: "MT",
                                    mixingCode: "SMT"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "SSV"
                                }, {
                                    name: "그린",
                                    code: "GR",
                                    mixingCode: "SGR"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "미스트",
                                enName: "Mist Glass",
                                code: "G",
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                doorColor: [{
                                    name: "베이지",
                                    code: "BE",
                                    mixingCode: "GBE"
                                }, {
                                    name: "핑크",
                                    code: "PK",
                                    mixingCode: "GPK"
                                }, {
                                    name: "민트",
                                    code: "MN",
                                    mixingCode: "GMN"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "GSV"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "네이쳐",
                                enName: "Nature Metal",
                                code: "M",
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                doorColor: [{
                                    name: "그레이",
                                    code: "GY",
                                    mixingCode: "MGY"
                                }, {
                                    name: "블랙",
                                    code: "BK",
                                    mixingCode: "MBK"
                                }, {
                                    name: "화이트",
                                    code: "WH",
                                    mixingCode: "MWH"
                                }]
                            }
                        }]
                    },*/
                            {
                                name: "노크온 매직스페이스",
                                defaultCode: "M870AAA451",
                                subModel: [{
                                        modelCode: "M871AAA551",
                                        magicSpace: 2,
                                        energy: 1,
                                        knockOn: true,
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    }
                                    /*, {
                                                                    modelCode: "M870AAA451",
                                                                    magicSpace: 1,
                                                                    energy: 2,
                                                                    knockOn: true,
                                                                    defaultPrice: "0",
                                                                    memberDiscount: "0",
                                                                    directDiscount: "0",
                                                                }*/
                                ],
                                leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M870AAA451.png",
                                simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M870AAA451.png",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                                magicSpace: 1,
                                energy: 1,
                                knockOn: true,
                                door: {
                                    count: 3,
                                    door1: {
                                        name: "상단(좌)",
                                        code: "D870TT",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door2: {
                                        name: "하단(좌)",
                                        code: "D870BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door3: {
                                        name: "하단(우)",
                                        code: "D870BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    }

                                },
                                doorColorData: [{
                                    doorMaterial: {
                                        name: "페닉스",
                                        enName: "FENIX",
                                        code: "F",
                                        desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                        doorColor: [{
                                            name: "보타닉",
                                            code: "BT",
                                            mixingCode: "FBT"
                                        }, {
                                            name: "샌드",
                                            code: "SD",
                                            mixingCode: "FSD"
                                        }, {
                                            name: "스톤",
                                            code: "ST",
                                            mixingCode: "FST"
                                        }]
                                    }

                                }, {
                                    doorMaterial: {
                                        name: "솔리드",
                                        enName: "Solid Metal",
                                        code: "S",
                                        desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                        doorColor: [{
                                            name: "맨해튼 미드나잇",
                                            code: "MT",
                                            mixingCode: "SMT"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "SSV"
                                        }, {
                                            name: "그린",
                                            code: "GR",
                                            mixingCode: "SGR"
                                        }]
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "미스트",
                                        enName: "Mist Glass",
                                        code: "G",
                                        desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                        doorColor: [{
                                            name: "베이지",
                                            code: "BE",
                                            mixingCode: "GBE"
                                        }, {
                                            name: "핑크",
                                            code: "PK",
                                            mixingCode: "GPK"
                                        }, {
                                            name: "민트",
                                            code: "MN",
                                            mixingCode: "GMN"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "GSV"
                                        }, {
                                            name: "레드우드",
                                            code: "RD",
                                            mixingCode: "GRD"
                                        }, {
                                            name: "클레이 브라운",
                                            code: "CL",
                                            mixingCode: "GCL"
                                        }]
                                        //210719 BTOCSITE-2346 신규 컬러 추가 - 레드우드,클레이브라운
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "네이쳐",
                                        enName: "Nature Metal",
                                        code: "M",
                                        desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                        doorColor: [{
                                            name: "그레이",
                                            code: "GY",
                                            mixingCode: "MGY"
                                        }, {
                                            name: "블랙",
                                            code: "BK",
                                            mixingCode: "MBK"
                                        }, {
                                            name: "화이트",
                                            code: "WH",
                                            mixingCode: "MWH"
                                        }]
                                    }
                                }]
                            }, 
                            /* 매직 스페이스 제품 출시  연기로 주석처리하였음 출시되면 주석 풀면 됨 20210428 기준 (210719 주석해제) start */
                              {
                                name: "매직 스페이스",
                                defaultCode: "M871AAA151",
                                subModel: [{
                                        modelCode: "M871AAA252",
                                        magicSpace: 2,
                                        energy: 2,
                                        knockOn: false,
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                }],
                                leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA151.png",
                                simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M871AAA151.png",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                                magicSpace: 1,
                                energy: 1,
                                knockOn: false,
                                door: {
                                    count: 4,
                                    door1: {
                                        name: "상단(좌)",
                                        code: "D870TT",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door2: {
                                        name: "상단(우)",
                                        code: "D870TT",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door3: {
                                        name: "하단(좌)",
                                        code: "D870BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door4: {
                                        name: "하단(우)",
                                        code: "D870BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    }
                                },
                                doorColorData: [{
                                    doorMaterial: {
                                        name: "페닉스",
                                        enName: "FENIX",
                                        code: "F",
                                        desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                        doorColor: [{
                                            name: "보타닉",
                                            code: "BT",
                                            mixingCode: "FBT"
                                        }, {
                                            name: "샌드",
                                            code: "SD",
                                            mixingCode: "FSD"
                                        }, {
                                            name: "스톤",
                                            code: "ST",
                                            mixingCode: "FST"
                                        }]
                                    }

                                }, {
                                    doorMaterial: {
                                        name: "솔리드",
                                        enName: "Solid Metal",
                                        code: "S",
                                        desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                        doorColor: [{
                                            name: "맨해튼 미드나잇",
                                            code: "MT",
                                            mixingCode: "SMT"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "SSV"
                                        }, {
                                            name: "그린",
                                            code: "GR",
                                            mixingCode: "SGR"
                                        }]
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "미스트",
                                        enName: "Mist Glass",
                                        code: "G",
                                        desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                        doorColor: [{
                                            name: "베이지",
                                            code: "BE",
                                            mixingCode: "GBE"
                                        }, {
                                            name: "핑크",
                                            code: "PK",
                                            mixingCode: "GPK"
                                        }, {
                                            name: "민트",
                                            code: "MN",
                                            mixingCode: "GMN"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "GSV"
                                        }, {
                                            name: "레드우드",
                                            code: "RD",
                                            mixingCode: "GRD"
                                        }, {
                                            name: "클레이 브라운",
                                            code: "CL",
                                            mixingCode: "GCL"
                                        }]
                                        //210719 BTOCSITE-2346 신규 컬러 추가 - 레드우드,클레이브라운
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "네이쳐",
                                        enName: "Nature Metal",
                                        code: "M",
                                        desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                        doorColor: [{
                                            name: "그레이",
                                            code: "GY",
                                            mixingCode: "MGY"
                                        }, {
                                            name: "블랙",
                                            code: "BK",
                                            mixingCode: "MBK"
                                        }, {
                                            name: "화이트",
                                            code: "WH",
                                            mixingCode: "MWH"
                                        }]
                                    }
                                }]
                            },       /* 매직 스페이스 제품 출시  연기로 주석처리하였음 출시되면 주석 풀면 됨 20210428 기준 end  (210719 주석해제) */
                            

                            /* BTOCSITE-4470 : 모델 베이지 항목 삭제(원본 파일은 _bak 파일에서 확인) 2021-08-25 */
                            

                            {
                                name: "빌트인 타입",
                                defaultCode: "M620AAA351",
                                leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M620AAA351.png",
                                simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M620AAA351.png",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                                magicSpace: 0,
                                energy: 1,
                                knockOn: true,
                                door: {
                                    count: 3,
                                    door1: {
                                        name: "상단(좌)",
                                        code: "D620TT",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door2: {
                                        name: "하단(좌)",
                                        code: "D620BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    },
                                    door3: {
                                        name: "하단(우)",
                                        code: "D620BB",
                                        defaultPrice: "0",
                                        memberDiscount: "0",
                                        directDiscount: "0",
                                    }
                                },
                                doorColorData: [{
                                    doorMaterial: {
                                        name: "페닉스",
                                        enName: "FENIX",
                                        code: "F",
                                        desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                        doorColor: [{
                                            name: "보타닉",
                                            code: "BT",
                                            mixingCode: "FBT"

                                        }, {
                                            name: "샌드",
                                            code: "SD",
                                            mixingCode: "FSD"
                                        }, {
                                            name: "스톤",
                                            code: "ST",
                                            mixingCode: "FST"
                                        }]
                                    }

                                }, {
                                    doorMaterial: {
                                        name: "솔리드",
                                        enName: "Solid Metal",
                                        code: "S",
                                        desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                        doorColor: [{
                                            name: "맨해튼 미드나잇",
                                            code: "MT",
                                            mixingCode: "SMT"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "SSV"
                                        }, {
                                            name: "그린",
                                            code: "GR",
                                            mixingCode: "SGR"
                                        }]
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "미스트",
                                        enName: "Mist Glass",
                                        code: "G",
                                        desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                        doorColor: [{
                                            name: "베이지",
                                            code: "BE",
                                            mixingCode: "GBE"
                                        }, {
                                            name: "핑크",
                                            code: "PK",
                                            mixingCode: "GPK"
                                        }, {
                                            name: "민트",
                                            code: "MN",
                                            mixingCode: "GMN"
                                        }, {
                                            name: "실버",
                                            code: "SV",
                                            mixingCode: "GSV"
                                        }, {
                                            name: "레드우드",
                                            code: "RD",
                                            mixingCode: "GRD"
                                        }, {
                                            name: "클레이 브라운",
                                            code: "CL",
                                            mixingCode: "GCL"
                                        }]
                                        //210719 BTOCSITE-2346 신규 컬러 추가 - 레드우드,클레이브라운
                                    }
                                }, {
                                    doorMaterial: {
                                        name: "네이쳐",
                                        enName: "Nature Metal",
                                        code: "M",
                                        desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                        doorColor: [{
                                            name: "그레이",
                                            code: "GY",
                                            mixingCode: "MGY"
                                        }, {
                                            name: "블랙",
                                            code: "BK",
                                            mixingCode: "MBK"
                                        }, {
                                            name: "화이트",
                                            code: "WH",
                                            mixingCode: "MWH"
                                        }]
                                    }
                                }]
                            }
                        ]
                    }]
                },
                //BTOCSITE-4239 오브제컬렉션 김치냉장고 제품 업데이트 요청 210902 - START
                {
                    name: "김치냉장고",
                    id: "refrigerator_kimchi",
                    leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator_kimchi.png", //BTOCSITE-4239 기본이미지(제일상단)
                    typModel: [
                        {
                        name: "4도어",
                        defaultCode: "Z491AAA151",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_Z491AAA151.png", //BTOCSITE-4239 선택모델 기본이미지(처음에보여지는 default 이미지)
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_Z491AAA151.png", //BTOCSITE-4239 선택모델 시뮬이미지(좌측 색 선택시 필요한 simul 이미지)
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                        door: {
                            count: 4,
                            door1: {
                                name: "상칸(좌)",
                                code: "K491TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            },door2: {
                                name: "상칸(우)",
                                code: "K491TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            },door3: {
                                name: "중칸",
                                code: "K491BB",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            },door4: {
                                name: "하칸",
                                code: "K491BB",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }
                        },
                        doorColorData: [{
                            doorMaterial: {
                                name: "페닉스",
                                enName: "FENIX",
                                code: "F",
                                desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                doorColor: [{
                                    name: "보타닉",
                                    code: "BT",
                                    mixingCode: "FBT"

                                }, {
                                    name: "샌드",
                                    code: "SD",
                                    mixingCode: "FSD"
                                }, {
                                    name: "스톤",
                                    code: "ST",
                                    mixingCode: "FST"
                                }]
                            }

                        },{
                            doorMaterial: {
                                name: "솔리드",
                                enName: "Solid Metal",
                                code: "S",
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                doorColor: [{
                                    name: "맨해튼 미드나잇",
                                    code: "MT",
                                    mixingCode: "SMT"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "SSV"
                                }, {
                                    name: "그린",
                                    code: "GR",
                                    mixingCode: "SGR"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "미스트",
                                enName: "Mist Glass",
                                code: "G",
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                doorColor: [{
                                    name: "베이지",
                                    code: "BE",
                                    mixingCode: "GBE"
                                }, {
                                    name: "핑크",
                                    code: "PK",
                                    mixingCode: "GPK"
                                }, {
                                    name: "민트",
                                    code: "MN",
                                    mixingCode: "GMN"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "GSV"
                                }, {
                                    name: "레드우드",
                                    code: "RD",
                                    mixingCode: "GRD"
                                }, {
                                    name: "클레이 브라운",
                                    code: "CL",
                                    mixingCode: "GCL"
                                }]
                                //210805 BTOCSITE-2346 신규 컬러 적용 - 레드우드,클레이브라운
                            }
                        }, {
                            doorMaterial: {
                                name: "네이쳐",
                                enName: "Nature Metal",
                                code: "M",
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                doorColor: [{
                                    name: "그레이",
                                    code: "GY",
                                    mixingCode: "MGY"
                                }, {
                                    name: "블랙",
                                    code: "BK",
                                    mixingCode: "MBK"
                                }, {
                                    name: "화이트",
                                    code: "WH",
                                    mixingCode: "MWH"
                                }]
                            }
                        }]
                        }, 
                        {
                            name: "3도어",
                            defaultCode: "Z331AAA151",
                            // BTOCSITE-4124 210915 3도어 'Z330AAA151' default 모델 제외
                            // subModel: [{
                            //     modelCode: "",
                            //     defaultPrice: "0",
                            //     memberDiscount: "0",
                            //     directDiscount: "0",
                            // }],
                            leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_Z330AAA151.png", //BTOCSITE-4239 선택모델 기본이미지(처음에보여지는 default 이미지)
                            simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_Z330AAA151.png",
                            defaultPrice: "0",
                            memberDiscount: "0",
                            directDiscount: "0",
                            door: {
                                count: 3,
                                door1: {
                                    name: "상칸",
                                    code: "K330TT",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door2: {
                                    name: "중칸",
                                    code: "K330MM",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                },
                                door3: {
                                    name: "하칸",
                                    code: "K330BB",
                                    defaultPrice: "0",
                                    memberDiscount: "0",
                                    directDiscount: "0",
                                }
                            },
                            doorColorData: [{
                                doorMaterial: {
                                    name: "페닉스",
                                    enName: "FENIX",
                                    code: "F",
                                    desc: "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-fenix.jpg",
                                    doorColor: [{
                                        name: "보타닉",
                                        code: "BT",
                                        mixingCode: "FBT"
    
                                    }, {
                                        name: "샌드",
                                        code: "SD",
                                        mixingCode: "FSD"
                                    }, {
                                        name: "스톤",
                                        code: "ST",
                                        mixingCode: "FST"
                                    }]
                                }
    
                            },{
                                doorMaterial: {
                                    name: "솔리드",
                                    enName: "Solid Metal",
                                    code: "S",
                                    desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                    doorColor: [{
                                        name: "맨해튼 미드나잇",
                                        code: "MT",
                                        mixingCode: "SMT"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "SSV"
                                    }, {
                                        name: "그린",
                                        code: "GR",
                                        mixingCode: "SGR"
                                    }]
                                }
                            }, {
                                doorMaterial: {
                                    name: "미스트",
                                    enName: "Mist Glass",
                                    code: "G",
                                    desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                    doorColor: [{
                                        name: "베이지",
                                        code: "BE",
                                        mixingCode: "GBE"
                                    }, {
                                        name: "핑크",
                                        code: "PK",
                                        mixingCode: "GPK"
                                    }, {
                                        name: "민트",
                                        code: "MN",
                                        mixingCode: "GMN"
                                    }, {
                                        name: "실버",
                                        code: "SV",
                                        mixingCode: "GSV"
                                    }, {
                                        name: "레드우드",
                                        code: "RD",
                                        mixingCode: "GRD"
                                    }, {
                                        name: "클레이 브라운",
                                        code: "CL",
                                        mixingCode: "GCL"
                                    }]
                                    //210805 BTOCSITE-2346 신규 컬러 적용 - 레드우드,클레이브라운
                                }
                            }, {
                                doorMaterial: {
                                    name: "네이쳐",
                                    enName: "Nature Metal",
                                    code: "M",
                                    desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                    descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                    doorColor: [{
                                        name: "그레이",
                                        code: "GY",
                                        mixingCode: "MGY"
                                    }, {
                                        name: "블랙",
                                        code: "BK",
                                        mixingCode: "MBK"
                                    }, {
                                        name: "화이트",
                                        code: "WH",
                                        mixingCode: "MWH"
                                    }]
                                }
                            }]
                        }]
                },//BTOCSITE-4239 오브제컬렉션 김치냉장고 제품 업데이트 요청 210902 - END
                {
                    name: "컨버터블",
                    id: "refrigerator_convertible",
                    leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator_convertible.png",
                    typModel: [{
                        name: "냉장고",
                        defaultCode: "X320AA",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_X320AA.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_X320AA.png",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                        door: {
                            count: 1,
                            door1: {
                                name: "도어",
                                code: "B320TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }
                        },
                        doorColorData: [{
                            doorMaterial: {
                                name: "솔리드",
                                enName: "Solid Metal",
                                code: "S",
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                doorColor: [{
                                    name: "맨해튼 미드나잇",
                                    code: "MT",
                                    mixingCode: "SMT"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "SSV"
                                }, {
                                    name: "그린",
                                    code: "GR",
                                    mixingCode: "SGR"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "미스트",
                                enName: "Mist Glass",
                                code: "G",
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                doorColor: [{
                                    name: "베이지",
                                    code: "BE",
                                    mixingCode: "GBE"
                                }, {
                                    name: "핑크",
                                    code: "PK",
                                    mixingCode: "GPK"
                                }, {
                                    name: "민트",
                                    code: "MN",
                                    mixingCode: "GMN"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "GSV"
                                }, {
                                    name: "레드우드",
                                    code: "RD",
                                    mixingCode: "GRD"
                                }, {
                                    name: "클레이 브라운",
                                    code: "CL",
                                    mixingCode: "GCL"
                                }]
                                //210805 BTOCSITE-2346 신규 컬러 적용 - 레드우드,클레이브라운
                            }
                        }, {
                            doorMaterial: {
                                name: "네이쳐",
                                enName: "Nature Metal",
                                code: "M",
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                doorColor: [{
                                    name: "그레이",
                                    code: "GY",
                                    mixingCode: "MGY"
                                }, {
                                    name: "블랙",
                                    code: "BK",
                                    mixingCode: "MBK"
                                }, {
                                    name: "화이트",
                                    code: "WH",
                                    mixingCode: "MWH"
                                }]
                            }
                        }]
                    }, {
                        name: "냉동고",
                        defaultCode: "Y320AA",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_X320AA.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_X320AA.png",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                        door: {
                            count: 1,
                            door1: {
                                name: "도어",
                                code: "B320TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }
                        },
                        doorColorData: [{
                            doorMaterial: {
                                name: "솔리드",
                                enName: "Solid Metal",
                                code: "S",
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                doorColor: [{
                                    name: "맨해튼 미드나잇",
                                    code: "MT",
                                    mixingCode: "SMT"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "SSV"
                                }, {
                                    name: "그린",
                                    code: "GR",
                                    mixingCode: "SGR"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "미스트",
                                enName: "Mist Glass",
                                code: "G",
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                doorColor: [{
                                    name: "베이지",
                                    code: "BE",
                                    mixingCode: "GBE"
                                }, {
                                    name: "핑크",
                                    code: "PK",
                                    mixingCode: "GPK"
                                }, {
                                    name: "민트",
                                    code: "MN",
                                    mixingCode: "GMN"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "GSV"
                                }, {
                                    name: "레드우드",
                                    code: "RD",
                                    mixingCode: "GRD"
                                }, {
                                    name: "클레이 브라운",
                                    code: "CL",
                                    mixingCode: "GCL"
                                }]
                                //210805 BTOCSITE-2346 신규 컬러 적용 - 레드우드,클레이브라운
                            }
                        }, {
                            doorMaterial: {
                                name: "네이쳐",
                                enName: "Nature Metal",
                                code: "M",
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                doorColor: [{
                                    name: "그레이",
                                    code: "GY",
                                    mixingCode: "MGY"
                                }, {
                                    name: "블랙",
                                    code: "BK",
                                    mixingCode: "MBK"
                                }, {
                                    name: "화이트",
                                    code: "WH",
                                    mixingCode: "MWH"
                                }]
                            }
                        }]
                    }, {
                        name: "김치냉장고",
                        defaultCode: "Z320AA",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_X320AA.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_X320AA.png",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                        door: {
                            count: 1,
                            door1: {
                                name: "",
                                code: "B320TT",
                                defaultPrice: "0",
                                memberDiscount: "0",
                                directDiscount: "0",
                            }
                        },
                        doorColorData: [{
                            doorMaterial: {
                                name: "솔리드",
                                enName: "Solid Metal",
                                code: "S",
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. 매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Solid.jpg",
                                doorColor: [{
                                    name: "맨해튼 미드나잇",
                                    code: "MT",
                                    mixingCode: "SMT"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "SSV"
                                }, {
                                    name: "그린",
                                    code: "GR",
                                    mixingCode: "SGR"
                                }]
                            }
                        }, {
                            doorMaterial: {
                                name: "미스트",
                                enName: "Mist Glass",
                                code: "G",
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
                                doorColor: [{
                                    name: "베이지",
                                    code: "BE",
                                    mixingCode: "GBE"
                                }, {
                                    name: "핑크",
                                    code: "PK",
                                    mixingCode: "GPK"
                                }, {
                                    name: "민트",
                                    code: "MN",
                                    mixingCode: "GMN"
                                }, {
                                    name: "실버",
                                    code: "SV",
                                    mixingCode: "GSV"
                                }, {
                                    name: "레드우드",
                                    code: "RD",
                                    mixingCode: "GRD"
                                }, {
                                    name: "클레이 브라운",
                                    code: "CL",
                                    mixingCode: "GCL"
                                }]
                                //210805 BTOCSITE-2346 신규 컬러 적용 - 레드우드,클레이브라운
                            }
                        }, {
                            doorMaterial: {
                                name: "네이쳐",
                                enName: "Nature Metal",
                                code: "M",
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Nature.jpg",
                                doorColor: [{
                                    name: "그레이",
                                    code: "GY",
                                    mixingCode: "MGY"
                                }, {
                                    name: "블랙",
                                    code: "BK",
                                    mixingCode: "MBK"
                                }, {
                                    name: "화이트",
                                    code: "WH",
                                    mixingCode: "MWH"
                                }]
                            }
                        }]
                    }]
                }
            ]
        }
        //베스트
    bestSeller = {
            bestConfig: [{
                    defaultCode: "M870AAA451",
                    modelCode: "M870GBB451",
                    door1: "D870TT-GBE",
                    door2: "D870BB-GBE",
                    door3: "D870BB-GBE",
                    door4: "",
                },
                {
                    defaultCode: "M870AAA451",
                    modelCode: "M870SGS451",
                    door1: "D870TT-SGR",
                    door2: "D870BB-SSV",
                    door3: "D870BB-SSV",
                    door4: "",
                }, {
                    defaultCode: "M870AAA451",
                    modelCode: "M870GSM451S",
                    door1: "D870TT-GSV",
                    door2: "D870BB-GMN",
                    door3: "D870BB-GMN",
                    door4: "",
                }
            ]
        }
        //추천조합
        //210719 BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청_신규컬러 추천조합제품 추가 - S
    proposeSet = {
        proposeConfig: [
            {
                defaultCode: "M620AAA351",
                modelCode: "M620FBB351S",
                door1: "D620TT-FBT",
                door2: "D620BB-FBT",
                door3: "D620BB-FBT",
                door4: ""
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620FSS351S",
                door1: "D620TT-FSD",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620FTT351S",
                door1: "D620TT-FST",
                door2: "D620BB-FST",
                door3: "D620BB-FST",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620FBS351",
                door1: "D620TT-FBT",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620FBT351S",
                door1: "D620TT-FBT",
                door2: "D620BB-FST",
                door3: "D620BB-FST",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620FTS351S",
                door1: "D620TT-FST",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620SGG351S",
                door1: "D620TT-SGR",
                door2: "D620BB-SGR",
                door3: "D620BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620SSS351S",
                door1: "D620TT-SSV",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620SMM351S",
                door1: "D620TT-SMT",
                door2: "D620BB-SMT",
                door3: "D620BB-SMT",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620SGS351",
                door1: "D620TT-SGR",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620SSG351S",
                door1: "D620TT-SSV",
                door2: "D620BB-SGR",
                door3: "D620BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620SMS351",
                door1: "D620TT-SMT",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620MBB351S",
                door1: "D620TT-MBK",
                door2: "D620BB-MBK",
                door3: "D620BB-MBK",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620MGG351S",
                door1: "D620TT-MGY",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620MWW351",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620MBG351S",
                door1: "D620TT-MBK",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620MWG351S",
                door1: "D620TT-MWH",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620MGB351S",
                door1: "D620TT-MGY",
                door2: "D620BB-MBK",
                door3: "D620BB-MBK",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620GBB351",
                door1: "D620TT-GBE",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620GBMB351S",
                door1: "D620TT-GBE",
                door2: "D620BB-GMN",
                door3: "D620BB-GMN",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620GBP351S",
                door1: "D620TT-GBE",
                door2: "D620BB-GPK",
                door3: "D620BB-GPK",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620GBS351S",
                door1: "D620TT-GBE",
                door2: "D620BB-GSV",
                door3: "D620BB-GSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620GSS351S",
                door1: "D620TT-GSV",
                door2: "D620BB-GSV",
                door3: "D620BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620GSB351S",
                door1: "D620TT-GSV",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620GSM351S",
                door1: "D620TT-GSV",
                door2: "D620BB-GMN",
                door3: "D620BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620GSP351S",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                modelCode: "M620GMB351S",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                modelCode: "M620GPB351",
                door1: "D620TT-GPK",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            },{
                defaultCode: "M620AAA351",
                modelCode: "M620GRC351S",
                door1: "D620TT-GRD",
                door2: "D620BB-GCL",
                door3: "D620BB-GCL",
                door4: "",
            },{
                defaultCode: "M620AAA351",
                modelCode: "M620GCB351S",
                door1: "D620TT-GCL",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870FBB451S",
                door1: "D870TT-FBT",
                door2: "D870BB-FBT",
                door3: "D870BB-FBT",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870FSS451S",
                door1: "D870TT-FSD",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870FTT451S",
                door1: "D870TT-FST",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870FBS451",
                door1: "D870TT-FBT",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870FBT451S",
                door1: "D870TT-FBT",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870FTS451S",
                door1: "D870TT-FST",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870SGG451S",
                door1: "D870TT-SGR",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870SSS451S",
                door1: "D870TT-SSV",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870SMM451S",
                door1: "D870TT-SMT",
                door2: "D870BB-SMT",
                door3: "D870BB-SMT",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870SGS451",
                door1: "D870TT-SGR",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870SSG451S",
                door1: "D870TT-SSV",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870SMS451S",
                door1: "D870TT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870MBB451S",
                door1: "D870TT-MBK",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870MGG451",
                door1: "D870TT-MGY",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870MWW451S",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870MBG451S",
                door1: "D870TT-MBK",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870MWG451S",
                door1: "D870TT-MWH",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870MGB451S",
                door1: "D870TT-MGY",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GBB451",
                door1: "D870TT-GBE",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870GBMB451S",
                door1: "D870TT-GBE",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GBP451S",
                door1: "D870TT-GBE",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870GBS451S",
                door1: "D870TT-GBE",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GSS451S",
                door1: "D870TT-GSV",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870GSB451S",
                door1: "D870TT-GSV",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GSM451S",
                door1: "D870TT-GSV",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870GSP451S",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GMB451S",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                modelCode: "M870GPB451",
                door1: "D870TT-GPK",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                modelCode: "M870GRC451S",
                door1: "D870TT-GRD",
                door2: "D870BB-GCL",
                door3: "D870BB-GCL",
                door4: "",
            },{
                defaultCode: "M870AAA451",
                modelCode: "M870GCB451S",
                door1: "D870TT-GCL",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },{
                defaultCode: "M871AAA551",
                modelCode: "M871FBB551S",
                door1: "D870TT-FBT",
                door2: "D870BB-FBT",
                door3: "D870BB-FBT",
                door4: "",
            },{
                defaultCode: "M871AAA551",
                modelCode: "M871FSS551S",
                door1: "D870TT-FSD",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871FTT551S",
                door1: "D870TT-FST",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },{
                defaultCode: "M871AAA551",
                modelCode: "M871FBS551S",
                door1: "D870TT-FBT",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871FBT551S",
                door1: "D870TT-FBT",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871FTS551S",
                door1: "D870TT-FST",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871SGG551S",
                door1: "D870TT-SGR",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871SSS551S",
                door1: "D870TT-SSV",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },{
                defaultCode: "M871AAA551",
                modelCode: "M871SMM551S",
                door1: "D870TT-SMT",
                door2: "D870BB-SMT",
                door3: "D870BB-SMT",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871SGS551",
                door1: "D870TT-SGR",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871SSG551S",
                door1: "D870TT-SSV",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871SMS551S",
                door1: "D870TT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871MBB551S",
                door1: "D870TT-MBK",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871MGG551S",
                door1: "D870TT-MGY",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871MWW551S",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871MBG551S",
                door1: "D870TT-MBK",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871MWG551S",
                door1: "D870TT-MWH",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871MGB551S",
                door1: "D870TT-MGY",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871GBB551",
                door1: "D870TT-GBE",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GBM551S",
                door1: "D870TT-GBE",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871GBP551S",
                door1: "D870TT-GBE",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GBS551S",
                door1: "D870TT-GBE",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871GSS551S",
                door1: "D870TT-GSV",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GSB551S",
                door1: "D870TT-GSV",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                modelCode: "M871GSM551S",
                door1: "D870TT-GSV",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GSP551S",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GMB551S",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GPB551",
                door1: "D870TT-GPK",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },{
                defaultCode: "M871AAA551",
                modelCode: "M871GRC551S",
                door1: "D870TT-GRD",
                door2: "D870BB-GCL",
                door3: "D870BB-GCL",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                modelCode: "M871GCB551S",
                door1: "D870TT-GCL",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "X320AA",
                modelCode: "X320SSS",
                door1: "B320TT-SSV",
                door2: "",
                door3: "",
                door4: "",

            },
            {
                defaultCode: "X320AA",
                modelCode: "X320SGS",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "X320AA",
                modelCode: "X320MMS",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "X320AA",
                modelCode: "X320GB",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                modelCode: "X320GSS",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                modelCode: "X320GPS",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                modelCode: "X320GMS",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                modelCode: "X320MWS",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "X320AA",
                modelCode: "X320MGS",
                door1: "B320TT-MGY",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "X320AA",
                modelCode: "X320MBS",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320SSS",
                door1: "B320TT-SSV",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320SGS",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320MMS",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320GB",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                modelCode: "Y320GS",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                modelCode: "Y320GP",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                modelCode: "Y320GM",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                modelCode: "Y320MWS",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320MGS",
                door1: "B320TT-MGR",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Y320AA",
                modelCode: "Y320MBS",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Z320AA",
                modelCode: "Z320SSS",
                door1: "B320TT-SSV",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Z320AA",
                modelCode: "Z320SGS",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Z320AA",
                modelCode: "Z320MMS",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Z320AA",
                modelCode: "Z320GB",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                modelCode: "Z320GS",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                modelCode: "Z320GPS",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                modelCode: "Z320GMS",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                modelCode: "Z320MWS",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            },
            {
                defaultCode: "Z320AA",
                modelCode: "Z320MGS",
                door1: "B320TT-MGR",
                door2: "",
                door3: "",
                door4: "",
            },{
                defaultCode: "Z320AA",
                modelCode: "Z320MBS",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z331AAA151",
                modelCode: "Z331FTS151",
                door1: "K330TT-FST",
                door2: "K330MM-FSD",
                door3: "K330BB-FSD",
                door4: "",
            }, {
                defaultCode: "Z331AAA151",
                modelCode: "Z331SGS151",
                door1: "K330TT-SGR",
                door2: "K330MM-SSV",
                door3: "K330BB-SSV",
                door4: "",
            }, {
                defaultCode: "Z331AAA151",
                modelCode: "Z331SMS151",
                door1: "K330TT-SMT",
                door2: "K330MM-SSV",
                door3: "K330BB-SSV",
                door4: "",
            },{
                defaultCode: "Z331AAA151",
                modelCode: "Z331SMM151S",
                door1: "K330TT-SMT",
                door2: "K330MM-SMT",
                door3: "K330BB-SMT",
                door4: "",
            },{
                defaultCode: "Z331AAA151",
                modelCode: "Z331GPB151",
                door1: "K330TT-GPK",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            },{
                defaultCode: "Z331AAA151",
                modelCode: "Z331GBB151",
                door1: "K330TT-GBE",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            },{
                defaultCode: "Z331AAA151",
                modelCode: "Z331GRC151",
                door1: "K330TT-GRD",
                door2: "K330MM-GCL",
                door3: "K330BB-GCL",
                door4: "",
            },{
                defaultCode: "Z331AAA151",
                modelCode: "Z331MBG151",
                door1: "K330TT-MBK",
                door2: "K330MM-MGY",
                door3: "K330BB-MGY",
                door4: "",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491FTS151",
                door1: "K491TT-FST",
                door2: "K491TT-FST",
                door3: "K491BB-FSD",
                door4: "K491BB-FSD",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491SMM151",
                door1: "K491TT-SMT",
                door2: "K491TT-SMT",
                door3: "K491BB-SMT",
                door4: "K491BB-SMT",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491SGS151",
                door1: "K491TT-SGR",
                door2: "K491TT-SGR",
                door3: "K491BB-SSV",
                door4: "K491BB-SSV",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491GPB151",
                door1: "K491TT-GPK",
                door2: "K491TT-GPK",
                door3: "K491BB-GBE",
                door4: "K491BB-GBE",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491GBB151",
                door1: "K491TT-GBE",
                door2: "K491TT-GBE",
                door3: "K491BB-GBE",
                door4: "K491BB-GBE",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491GRC151",
                door1: "K491TT-GRD",
                door2: "K491TT-GRD",
                door3: "K491BB-GCL",
                door4: "K491BB-GCL",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491GBP151",
                door1: "K491TT-GBE",
                door2: "K491TT-GBE",
                door3: "K491BB-GPK",
                door4: "K491BB-GPK",
            },{
                defaultCode: "Z491AAA151", 
                modelCode: "Z491SBG151",
                door1: "K491TT-SMT",
                door2: "K491TT-SMT",
                door3: "K491BB-SSV",
                door4: "K491BB-SSV",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FBB453S",
                door1: "D870JT-FBT",
                door2: "D870BB-FBT",
                door3: "D870BB-FBT",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FSS453S",
                door1: "D870JT-FSD",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FTT453S",
                door1: "D870JT-FST",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FBS453S",
                door1: "D870JT-FBT",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FBT453S",
                door1: "D870JT-FBT",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821FTS453S",
                door1: "D870JT-FST",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SGG453S",
                door1: "D870JT-SGR",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SSS453S",
                door1: "D870JT-SSV",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SMM453S",
                door1: "D870JT-SMT",
                door2: "D870BB-SMT",
                door3: "D870BB-SMT",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SGS453",
                door1: "D870JT-SGR",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SSG453S",
                door1: "D870JT-SSV",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821SMS453S",
                door1: "D870JT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MBB453S",
                door1: "D870JT-MBK",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MGG453S",
                door1: "D870JT-MGY",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MWW453S",
                door1: "D870JT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MBG453S",
                door1: "D870JT-MBK",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MWG453S",
                door1: "D870JT-MWH",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MGB453S",
                door1: "D870JT-MGY",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821MGW453S",
                door1: "D870JT-MGY",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GBB453",
                door1: "D870JT-GBE",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GBM453S",
                door1: "D870JT-GBE",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GBP453S",
                door1: "D870JT-GBE",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GBS453S",
                door1: "D870JT-GBE",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GSS453S",
                door1: "D870JT-GSV",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GSB453S",
                door1: "D870JT-GSV",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GSM453S",
                door1: "D870JT-GSV",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GSP453S",
                door1: "D870JT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GMB453S",
                door1: "D870JT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "W821AAA453",
                modelCode: "W821GPB453",
                door1: "D870JT-GPK",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            // BTOCSITE-2346 210806 신규컬러 제품 추천조합 제외 - S
            // , {
            //     defaultCode: "W821AAA453",
            //     modelCode: "W821GRC453S",
            //     door1: "D870JT-GRD",
            //     door2: "D870BB-GCL",
            //     door3: "D870BB-GCL",
            //     door4: "",
            // }, {
            //     defaultCode: "W821AAA453",
            //     modelCode: "W821GCB453S",
            //     door1: "D870JT-GCL",
            //     door2: "D870BB-GBE",
            //     door3: "D870BB-GBE",
            //     door4: "",
            // }, 
            // BTOCSITE-2346 210806 신규컬러 제품 추천조합 제외 - E
            {
                defaultCode: "W821AAA463",
                modelCode: "W821SMS463S",
                door1: "D870JT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821FBS153S",
                door1: "D870JT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821FTS153S",
                door1: "D870JT-FST",
                door2: "D870TT-FST",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821SSS153S",
                door1: "D870JT-SSV",
                door2: "D870TT-SSV",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821SMM153S",
                door1: "D870JT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SMT",
                door4: "D870BB-SMT",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821SGS153",
                door1: "D870JT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821SMS153S",
                door1: "D870JT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821MBB153S",
                door1: "D870JT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821MWW153S",
                door1: "D870JT-MWH",
                door2: "D870TT-MWH",
                door3: "D870BB-MWH",
                door4: "D870BB-MWH",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821MBG153S", //SUSPENDED상태(PLP로 이동 TEST) 210805 BTOCSITE-2346
                door1: "D870JT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821MGB153S",
                door1: "D870JT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821MGW153S",
                door1: "D870JT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MWH",
                door4: "D870BB-MWH",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821GBB153",
                door1: "D870JT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821GBP153S",
                door1: "D870JT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GPK",
                door4: "D870BB-GPK",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821GPB153",
                door1: "D870JT-GPK",
                door2: "D870TT-GPK",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "W821AAA153",
                modelCode: "W821GRC153S",
                door1: "D870JT-GRD",
                door2: "D870TT-GRD",
                door3: "D870BB-GCL",
                door4: "D870BB-GCL",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FBB252S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FBT",
                door4: "D870BB-FBT",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FSS252S",
                door1: "D870TT-FSD",
                door2: "D870TT-FSD",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FTT252S",
                door1: "D870TT-FST",
                door2: "D870TT-FST",
                door3: "D870BB-FST",
                door4: "D870BB-FST",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FBS252S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FBT252S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FST",
                door4: "D870BB-FST",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871FTS252S",
                door1: "D870TT-FST",
                door2: "D870TT-FST",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SGG252S",
                door1: "D870TT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SGR",
                door4: "D870BB-SGR",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SSS252S",
                door1: "D870TT-SSV",
                door2: "D870TT-SSV",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SMM252S",
                door1: "D870TT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SMT",
                door4: "D870BB-SMT",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SGS252",
                door1: "D870TT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SSG252S",
                door1: "D870TT-SSV",
                door2: "D870TT-SSV",
                door3: "D870BB-SGR",
                door4: "D870BB-SGR",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871SMS252S",
                door1: "D870TT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MBB252S",
                door1: "D870TT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MGG252S",
                door1: "D870TT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MWW252S",
                door1: "D870TT-MWH",
                door2: "D870TT-MWH",
                door3: "D870BB-MWH",
                door4: "D870BB-MWH",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MBG252S",
                door1: "D870TT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MWG252S",
                door1: "D870TT-MWH",
                door2: "D870TT-MWH",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871MGB252S",
                door1: "D870TT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GBB252",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GBM252S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GMN",
                door4: "D870BB-GMN",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GBP252S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GPK",
                door4: "D870BB-GPK",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GBS252S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GSV",
                door4: "D870BB-GSV",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GSS252S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GSV",
                door4: "D870BB-GSV",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GSB252S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GSM252S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GMN",
                door4: "D870BB-GMN",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GSP252S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GPK",
                door4: "D870BB-GPK",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GMB252S",
                door1: "D870TT-GMN",
                door2: "D870TT-GMN",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA252",
                modelCode: "M871GPB252",
                door1: "D870TT-GPK",
                door2: "D870TT-GPK",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            },{
                defaultCode: "M871AAA252",
                modelCode: "M871GRC252S",
                door1: "D870TT-GRD",
                door2: "D870TT-GRD",
                door3: "D870BB-GCL",
                door4: "D870BB-GCL",
            },{
                defaultCode: "M871AAA252",
                modelCode: "M871GCB252S",
                door1: "D870TT-GCL",
                door2: "D870TT-GCL",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            },{
                defaultCode: "M871AAA151",
                modelCode: "M871FBB151S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FBT",
                door4: "D870BB-FBT",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871FSS151S",
                door1: "D870TT-FSD",
                door2: "D870TT-FSD",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871FTT151S",
                door1: "D870TT-FST",
                door2: "D870TT-FST",
                door3: "D870BB-FST",
                door4: "D870BB-FST",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871FBS151S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871FBT151S",
                door1: "D870TT-FBT",
                door2: "D870TT-FBT",
                door3: "D870BB-FST",
                door4: "D870BB-FST",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871FTS151S",
                door1: "D870TT-FST",
                door2: "D870TT-FST",
                door3: "D870BB-FSD",
                door4: "D870BB-FSD",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SGG151S",
                door1: "D870TT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SGR",
                door4: "D870BB-SGR",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SSS151S",
                door1: "D870TT-SSV",
                door2: "D870TT-SSV",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SMM151S",
                door1: "D870TT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SMT",
                door4: "D870BB-SMT",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SGS151",
                door1: "D870TT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA041",
                modelCode: "M871SGS041",
                door1: "D870TT-SGR",
                door2: "D870TT-SGR",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SSG151S",
                door1: "D870TT-SSV",
                door2: "D870TT-SSV",
                door3: "D870BB-SGR",
                door4: "D870BB-SGR",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871SMS151S",
                door1: "D870TT-SMT",
                door2: "D870TT-SMT",
                door3: "D870BB-SSV",
                door4: "D870BB-SSV",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MBB151S",
                door1: "D870TT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "M871AAA041",
                modelCode: "M871MBB041S",
                door1: "D870TT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MGG151S",
                door1: "D870TT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MWW151S",
                door1: "D870TT-MWH",
                door2: "D870TT-MWH",
                door3: "D870BB-MWH",
                door4: "D870BB-MWH",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MBG151S",
                door1: "D870TT-MBK",
                door2: "D870TT-MBK",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MWG151S",
                door1: "D870TT-MWH",
                door2: "D870TT-MWH",
                door3: "D870BB-MGY",
                door4: "D870BB-MGY",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871MGB151S",
                door1: "D870TT-MGY",
                door2: "D870TT-MGY",
                door3: "D870BB-MBK",
                door4: "D870BB-MBK",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GBB151",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GBM151S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GMN",
                door4: "D870BB-GMN",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GBP151S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GPK",
                door4: "D870BB-GPK",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GBS151S",
                door1: "D870TT-GBE",
                door2: "D870TT-GBE",
                door3: "D870BB-GSV",
                door4: "D870BB-GSV",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GSS151S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GSV",
                door4: "D870BB-GSV",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GSB151S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GSM151S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GMN",
                door4: "D870BB-GMN",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GSP151S",
                door1: "D870TT-GSV",
                door2: "D870TT-GSV",
                door3: "D870BB-GPK",
                door4: "D870BB-GPK",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GMB151S",
                door1: "D870TT-GMN",
                door2: "D870TT-GMN",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA151",
                modelCode: "M871GPB151",
                door1: "D870TT-GPK",
                door2: "D870TT-GPK",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            },{
                defaultCode: "M871AAA151",
                modelCode: "M871GRC151S",
                door1: "D870TT-GRD",
                door2: "D870TT-GRD",
                door3: "D870BB-GCL",
                door4: "D870BB-GCL",
            },{
                defaultCode: "M871AAA151",
                modelCode: "M871GCB151S",
                door1: "D870TT-GCL",
                door2: "D870TT-GCL",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA041",
                modelCode: "M871GPB041",
                door1: "D870TT-GPK",
                door2: "D870TT-GPK",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }, {
                defaultCode: "M871AAA041",
                modelCode: "M871GRC041S",
                door1: "D870TT-GRD",
                door2: "D870TT-GRD",
                door3: "D870BB-GCL",
                door4: "D870BB-GCL",
            }, {
                defaultCode: "M871AAA041",
                modelCode: "M871GCB041S",
                door1: "D870TT-GCL",
                door2: "D870TT-GCL",
                door3: "D870BB-GBE",
                door4: "D870BB-GBE",
            }
        ]
        }
        //210719 BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청_신규컬러 추천조합제품 추가 - E
    myPickSet = {
        myPickConfig: [
            /*
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-FBT",
                door2: "D620BB-FBT",
                door3: "D620BB-FBT",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-FSD",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-FST",
                door2: "D620BB-FST",
                door3: "D620BB-FST",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-FBT",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-FBT",
                door2: "D620BB-FST",
                door3: "D620BB-FST",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-FST",
                door2: "D620BB-FSD",
                door3: "D620BB-FSD",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-SGR",
                door2: "D620BB-SGR",
                door3: "D620BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-SSV",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-SMT",
                door2: "D620BB-SMT",
                door3: "D620BB-SMT",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-SGR",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-SSV",
                door2: "D620BB-SGR",
                door3: "D620BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-SMT",
                door2: "D620BB-SSV",
                door3: "D620BB-SSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-MBK",
                door2: "D620BB-MBK",
                door3: "D620BB-MBK",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-MGY",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-MBK",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-MWH",
                door2: "D620BB-MGY",
                door3: "D620BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-MGY",
                door2: "D620BB-MBK",
                door3: "D620BB-MBK",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-GBE",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-GBE",
                door2: "D620BB-GMN",
                door3: "D620BB-GMN",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-GBE",
                door2: "D620BB-GPK",
                door3: "D620BB-GPK",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-GBE",
                door2: "D620BB-GSV",
                door3: "D620BB-GSV",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-GSV",
                door2: "D620BB-GSV",
                door3: "D620BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-GSV",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D620TT-GSV",
                door2: "D620BB-GMN",
                door3: "D620BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M620AAA351",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M620AAA351",
                door1: "D620TT-GPK",
                door2: "D620BB-GBE",
                door3: "D620BB-GBE",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-FBT",
                door2: "D870BB-FBT",
                door3: "D870BB-FBT",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-FSD",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-FST",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-FBT",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-FBT",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-FST",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-SGR",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-SSV",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-SMT",
                door2: "D870BB-SMT",
                door3: "D870BB-SMT",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-SGR",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-SSV",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-MBK",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-MGY",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-MBK",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-MWH",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-MGY",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-GBE",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-GBE",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-GBE",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-GBE",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-GSV",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-GSV",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-GSV",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M870AAA451",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M870AAA451",
                door1: "D870TT-GPK",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-FBT",
                door2: "D870BB-FBT",
                door3: "D870BB-FBT",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-FSD",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-FST",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-FBT",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-FBT",
                door2: "D870BB-FST",
                door3: "D870BB-FST",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-FST",
                door2: "D870BB-FSD",
                door3: "D870BB-FSD",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-SGR",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-SSV",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-SMT",
                door2: "D870BB-SMT",
                door3: "D870BB-SMT",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-SGR",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-SSV",
                door2: "D870BB-SGR",
                door3: "D870BB-SGR",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-SMT",
                door2: "D870BB-SSV",
                door3: "D870BB-SSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-MBK",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-MGY",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-MWH",
                door2: "D870BB-MWH",
                door3: "D870BB-MWH",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-MBK",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-MWH",
                door2: "D870BB-MGY",
                door3: "D870BB-MGY",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-MGY",
                door2: "D870BB-MBK",
                door3: "D870BB-MBK",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-GBE",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GBE",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-GBE",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GBE",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-GSV",
                door2: "D870BB-GSV",
                door3: "D870BB-GSV",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GSV",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            },
            {
                defaultCode: "M871AAA551",
                door1: "D870TT-GSV",
                door2: "D870BB-GMN",
                door3: "D870BB-GMN",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GSV",
                door2: "D870BB-GPK",
                door3: "D870BB-GPK",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GMN",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "M871AAA551",
                door1: "D870TT-GPK",
                door2: "D870BB-GBE",
                door3: "D870BB-GBE",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-SSR",
                door2: "",
                door3: "",
                door4: "",

            }, {
                defaultCode: "X320AA",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-MGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "X320AA",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-SSR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-MGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Y320AA",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-SSR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-SGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-SMT",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-GBE",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-GSV",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-GPK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-GMN",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-MWH",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-MGR",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z320AA",
                door1: "B320TT-MBK",
                door2: "",
                door3: "",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FSD",
                door2: "K330MM-FSD",
                door3: "K330BB-FSD",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FBT",
                door2: "K330MM-FBT",
                door3: "K330BB-FBT",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FST",
                door2: "K330MM-FST",
                door3: "K330BB-FST",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FST",
                door2: "K330MM-FSD",
                door3: "K330BB-FSD",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FBT",
                door2: "K330MM-FSD",
                door3: "K330BB-FSD",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-FBT",
                door2: "K330MM-FST",
                door3: "K330BB-FST",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SSV",
                door2: "K330MM-SSV",
                door3: "K330BB-SSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SGR",
                door2: "K330MM-SGR",
                door3: "K330BB-SGR",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SMT",
                door2: "K330MM-SMT",
                door3: "K330BB-SMT",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SSV",
                door2: "K330MM-SGR",
                door3: "K330BB-SGR",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SMT",
                door2: "K330MM-SSV",
                door3: "K330BB-SSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-SGR",
                door2: "K330MM-SSV",
                door3: "K330BB-SSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GBE",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GSV",
                door2: "K330MM-GSV",
                door3: "K330BB-GSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GPK",
                door2: "K330MM-GPK",
                door3: "K330BB-GPK",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GMN",
                door2: "K330MM-GMN",
                door3: "K330BB-GMN",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GPK",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GPK",
                door2: "K330MM-GSV",
                door3: "K330BB-GSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GMN",
                door2: "K330MM-GSV",
                door3: "K330BB-GSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GMN",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GSV",
                door2: "K330MM-GPK",
                door3: "K330BB-GPK",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GSV",
                door2: "K330MM-GMN",
                door3: "K330BB-GMN",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GSV",
                door2: "K330MM-GBE",
                door3: "K330BB-GBE",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GBE",
                door2: "K330MM-GSV",
                door3: "K330BB-GSV",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GBE",
                door2: "K330MM-GPK",
                door3: "K330BB-GPK",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-GBE",
                door2: "K330MM-GMN",
                door3: "K330BB-GMN",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-MWH",
                door2: "K330MM-MWH",
                door3: "K330BB-MWH",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-MGY",
                door2: "K330MM-MGY",
                door3: "K330BB-MGY",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-MBK",
                door2: "K330MM-MBK",
                door3: "K330BB-MBK",
                door4: "",
            }, {
                defaultCode: "Z330AAA151",
                door1: "K330TT-MBK",
                door2: "K330MM-MGY",
                door3: "K330BB-MGY",
                door4: "",
            }
            */
        ]
    }

    $(document).ready(function() {

        /* TEST */
        //$('.model_experience').attr('data-page-type', 'HIMART');

        $("html, body").scrollTop(0);
        window.onpageshow = function(event) {
            if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
                location.reload();
            }
        }
        //초기셋팅
        modelSimulator.init();

        $(document).on("click", function(e) {
            if (!$(e.target).closest(".total_price_info_wrap").hasClass("is_active")) {
                $(".total_price_info_wrap").removeClass("is_active");
            }
            if (!$(e.target).closest(".model_door").length > 0) {
                let targetNone = "Y";
                $(".model_set_wrap[data-model-editing='Y'] .model_door").each(function() {
                    if (!$(this).find(".door_img img").length > 0) {
                        targetNone = "N"
                    }
                });
                setTimeout(function() {
                    if (targetNone == "Y") {
                        $(".model_door").attr("data-edit", "N");
                    }
                }, 100);


            }
        });

        $(".model_simul_step_wrap").mCustomScrollbar();
        simulPositionAutoMove();
        $(window).on("resize", function() {
            simulPositionAutoMove();
        });
        $(window).on("scroll", function() {
            simulPositionAutoMove();
        });

        

        /* 20210622 오브제컬렉션_ 매장 시뮬레이터 */
        var $objLocation = location.pathname;
        var $objHeader = $('.header');
        var $objBreadcrb = $('.breadcrumb');
        var $objContent = $('.model_experience');
        var $objTopNavi = $('.brand-wrap');
        var $objMyPickBtn = $('.myPick');
        var $objFooter = $('footer');
        var $step3 = $('.simul_step.simul_step3');  // BTOCSITE-1582 add
        var $quickbuy = $('#quick_buy');    // BTOCSITE-1582 add
        //210719 추가 BTOCSITE-2346 - S
        var $quickbuyInfoBody = $('#quick_buy .total_price_info_body');
        var $step3Tit = $('.simul_step.simul_step3 .simul_tit > .tit');
        var $step3Etc = $('.simul_step.simul_step3 dd .etc_area');
        //210719 추가 BTOCSITE-2346 - E
        

        if($objContent.attr('data-page-type') === 'COMMON') {
            //console.log("common");
            $quickbuy.hide();   // BTOCSITE-1582 add
        }
        if($objContent.attr('data-page-type') === 'NEWBEST') {
            //console.log("NEWBEST");
            $objHeader.hide();
            $objBreadcrb.hide();
            $objTopNavi.hide();
            $objMyPickBtn.hide();
            $objFooter.hide();
            //$step3.show();  // BTOCSITE-1582 add
            //$quickbuy.show();   // BTOCSITE-1582 add
                        
            //start - 210719 BTOCSITE-2346 add
            $quickbuy.show();
            $step3.show();
            $step3Tit.html("특성 비교하여 모델 정하기");
            $step3Etc.hide();
            $quickbuy.css("border-top","0");
            $quickbuyInfoBody.css("padding","0");
            // end - 210719 BTOCSITE-2346 add
        }
        if($objContent.attr('data-page-type') === 'HIMART') {
            // console.log("HIMART");
            $objHeader.hide();
            $objBreadcrb.hide();
            $objTopNavi.hide();
            $objMyPickBtn.hide();
            $objFooter.hide();
            //$step3.show();  // BTOCSITE-1582 add
            //$quickbuy.show();   // BTOCSITE-1582 add
            
            //start - 210719 BTOCSITE-2346 add
            $quickbuy.show();
            $step3.show();
            $step3Tit.html("특성 비교하여 모델 정하기");
            $step3Etc.hide();
            $quickbuy.css("border-top","0");
            $quickbuyInfoBody.css("padding","0");
            // end - 210719 BTOCSITE-2346 add
        }
        /* //20210622 오브제컬렉션_ 매장 시뮬레이터 */

        // S - 210805 BTOCSITE-3487 오브제컬렉션 제품체험 매장 연계 추가 건_전자랜드 추가
        if($objContent.attr('data-page-type') === 'ETLAND') {
            // console.log("ETLAND");
            $objHeader.hide();
            $objBreadcrb.hide();
            $objTopNavi.hide();
            $objMyPickBtn.hide();
            $objFooter.hide();
            //$step3.show();  // BTOCSITE-1582 add
            //$quickbuy.show();   // BTOCSITE-1582 add
            $quickbuy.show();
            $step3.show();
            $step3Tit.html("특성 비교하여 모델 정하기");
            $step3Etc.hide();
            $quickbuy.css("border-top","0");
            $quickbuyInfoBody.css("padding","0");
        }
        // E - 210805 BTOCSITE-3487 오브제컬렉션 제품체험 매장 연계 추가 건_전자랜드 추가

        //추천조합 열기
        $(".proposeModel").on("click", function() {
            let modelCode = $(".model_simul_wrap .simul_wrap .simul_body .model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            let modelcate = $(".model_simul_wrap .simul_wrap .simul_body .model_set_wrap[data-model-editing='Y']").attr("data-model-cate");
            if ($(this).hasClass("border")) {
                $(this).removeClass("border");
                $(".myPick").addClass("border");
                modelSimulator.openProposeModel(modelCode, modelcate);
                modelSimulator.closeMyPickModel();
                //modelSimulator.mobileStep(".simul_step2");
                setTimeout(function() {
                    $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                }, 500);
            } else {
                $(this).addClass("border");
                modelSimulator.closeProposeModel();
            }
        });
        //추천조합 닫기
        $(".color_best .btn-close").on("click", function() {
            $(".proposeModel").addClass("border");
            modelSimulator.closeProposeModel();
        });
        //추천조합 선택
        $(document).on("click", ".color_best .btn_propose_model_sel", function() {
            /* 
            BTOCSITE-3032 add
            var modelCode = $(this).data().modelCode;
            var defaultModelCode = $(this).data().modelDefaultCode;
            BTOCSITE-3032 add 
            */
            
            // BTOCSITE-2346 기존 형태로 원복 - data-best-code 추천조합 모델명 들어가도록 변경 - 210721
            let modelName = $(this).find(">span").text();
            
            $(this).find(".mini_model_wrap .mini_model").each(function() {
                let idx = $(this).index();
                let idxImg = $(this).html();

                $(".simul_wrap .model_set_wrap[data-model-editing='Y'] .sel_model_set .door_wrap .model_door:eq(" + idx + ")").attr({ 
                    "data-door-model_spec_material": $(this).attr("data-material"), 
                    "data-door-model_spec_color": $(this).attr("data-color-code"), 
                    "data-door-code": $(this).attr("data-front-code"), 
                    "data-door-text": $(this).attr("data-k-materlal") + " " + $(this).attr("data-k-color")
                });
                $(".simul_wrap .model_set_wrap[data-model-editing='Y'] .sel_model_set .door_wrap .model_door:eq(" + idx + ") .door_img").html(idxImg);
                // BTOCSITE-2346 기존 형태로 원복 - data-best-code 추천조합 모델명 들어가도록 변경 - 210721
                $(".simul_wrap .model_set_wrap[data-model-editing='Y']").attr({ "data-best": "Y", "data-best-code": modelName});
            });
            $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
            $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
            completedCheck();
        });

        //내가만든 오브제 열기
        $(".myPick").on("click", function() {
            let modelCode = $(".model_simul_wrap .simul_wrap .simul_body .model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            let modelcate = $(".model_simul_wrap .simul_wrap .simul_body .model_set_wrap[data-model-editing='Y']").attr("data-model-cate");
            if ($(this).hasClass("border")) {
                $(this).removeClass("border");
                $(".proposeModel").addClass("border");
                $(".chng_pannel").addClass("border"); // BTOCSITE-3198 개별 패널 판매 관련 내용 추가
                modelSimulator.openMyPickModel(modelCode, modelcate);
                modelSimulator.closeProposeModel();
                //modelSimulator.mobileStep(".simul_step2");
                myPickBtnFn();
                // setTimeout(function() {
                //     $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                // }, 500);
            } else {
                $(this).addClass("border");
                modelSimulator.closeMyPickModel();
            }
        });
        //내가만든 오브제 닫기
        $(".color_my_pick .btn-close").on("click", function() {
            $(".myPick").addClass("border");
            modelSimulator.closeMyPickModel();
        });
        //내가만든 오브제 선택
        $(document).on("click", ".color_my_pick .btn_myPick_model_sel", function() {
            let modelName = $(this).find(">span").text();
            $(this).find(".mini_model_wrap .mini_model").each(function() {
                let idx = $(this).index();
                let idxImg = $(this).html();

                $(".simul_wrap .model_set_wrap[data-model-editing='Y'] .sel_model_set .door_wrap .model_door:eq(" + idx + ")").attr({ "data-door-model_spec_material": $(this).attr("data-material"), "data-door-model_spec_color": $(this).attr("data-color-code"), "data-door-code": $(this).attr("data-front-code"), "data-door-text": $(this).attr("data-k-materlal") + " " + $(this).attr("data-k-color") });
                $(".simul_wrap .model_set_wrap[data-model-editing='Y'] .sel_model_set .door_wrap .model_door:eq(" + idx + ") .door_img").html(idxImg);
            });
            $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
            $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
            completedCheck();
        });

        // BTOCSITE-3198 패널 교체 견적 보기 > 패널 선택 - 2021-10-12 - start
        $(document).on("click", ".pannel_list li", function() {
            
            if($(this).hasClass('is_active')){
                $(this).removeClass("is_active");
            }else{
                $(this).addClass("is_active");
            }

            let modelPrice = '';

            if($(this).hasClass("is_active")){
                modelPrice = $(this).find("span.product_price em").text();
                $(this).attr("data-model-price", modelPrice);                
            }

            $('.btn_total').click(function(){
                pannelSumTotal();
                $('.sum').css('display','flex'); //2021-10-14 추가
            });
        });

        function pannelSumTotal(){
            let totalPannelSumPrice = 0;
        
            $(".pannel_list li.is_active").each(function(){
                totalPannelSumPrice += parseInt(minusComma($(this).attr('data-model-price')));
            });
            $(".product_price .total_price em").text(addComma(totalPannelSumPrice));
            $(".total_result_price .cont .price em").text(addComma(totalPannelSumPrice));
            console.log("후"+totalPannelSumPrice);
        }

        //BTOCSITE-3198 패널만 교체 클릭 이벤트
        $('.chng_pannel').on("click",function(){
            if ($(this).hasClass("border")) {
                $(this).removeClass("border");
                $('.myPick').addClass("border");
            } else {
                $(this).addClass("border");
            }

            modelCheckdone();
            let $this = $(".simul_wrap .model_set_wrap[data-model-editing='Y']");
            let idx = $this.index();
            let modelCate = $this.attr("data-model-cate");                        
            let defaultModel = $this.attr("data-model_code");
            let defaultPrice = $this.attr("data-model-price");
            let modelName = $this.find(".model_name").text();
            let doorInfo = [];
            let saveInfo = [];            
            saveInfo.push(defaultModel);
            
            $this.find(".door_wrap .model_door").each(function() {
                let info = [];
                info.push($(this).attr("data-door-direction"));
                info.push($(this).attr("data-door-model_location"));
                info.push($(this).attr("data-door-model_spec_material"));
                info.push($(this).attr("data-door-model_spec_color"));
                info.push($(this).attr("data-door-price"));
                info.push($(this).attr("data-door-code"));
                info.push($(this).attr("data-door-text"));
                info.push($(this).attr("data-door-klocation"));
                doorInfo.push(info);
                let doorMix = $(this).attr("data-door-code") + "-" + $(this).attr("data-door-model_spec_material") + $(this).attr("data-door-model_spec_color");
                saveInfo.push(doorMix);
            });
            if ($(".simul_wrap .model_set_wrap[data-model-editing='Y']").attr("data-model-completed") == "Y") {
                modelSimulator.pannelCheck(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo);
                setTimeout(function() {
                    $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                }, 500);
            } else {
                let desc = "";
                let obj = {
                    title: '모든 컬러 선택 완료 후 <br />견적 확인하시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
            }
            //modelSimulator.mobileStep(".simul_step3");
        });        
        // BTOCSITE-3198 패널 교체 견적 보기 > 패널 선택 - 2021-10-12 - end

        //제품 다시선택하기
        $(".model_reset").on("click", function() {
            var obj = {
                title: '',
                typeClass: '',
                cancelBtnName: '',
                okBtnName: '',
                ok: function() {
                    $(".model_sub_tab_wrap").removeClass("is_active");
                    $(".model_sub_tab_wrap .model_sub_tab_head").removeClass("is_active");
                    $(".model_sub_tab_wrap .model_sub_tab_cont").removeClass("is_active");
                    $(".color_mixing_area .color_sel_wrap").removeClass("is_active");
                    $(".color_mixing_area .color_my_pick").removeClass("is_active");
                    $(".color_mixing_area .color_best").removeClass("is_active");
                    $(".simul_step2 .etc_area").removeClass("is_active");
                    $(".etc_area").removeClass("is_active");
                    $(".etc_area_bottom").removeClass("is_active");
                    $(".simul_step3 .etc_area").removeClass("is_active");
                    $(".simul_step3 .compare_sel_model_area").removeClass("is_active");
                    let idx = $(".model_set_wrap[data-model-editing='Y']").index();
                    priceSumList.removeSlide(idx);
                    $(".model_set_wrap[data-model-editing='Y']").remove();
                    $(".model_set_wrap").attr("data-model-add", 'N');
                    $(".model_set_wrap:last-child").attr("data-model-add", 'Y');
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", false);
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
                    if ($(".model_set_wrap").length == 1) {
                        $(".model_set_wrap").attr("data-del", "N");
                    } else if ($(".model_set_wrap").length < 1) {
                        $(".model_simul_area").removeClass("is_active");
                        $(".simul_wrap").removeClass("is_active");
                    }
                    $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "top", 0);
                    modelSimulator.closeProposeModel();
                    modelSimulator.closeMyPickModel();
                    $(".proposeModel").addClass("border");
                    $(".myPick").addClass("border");
                    modelSimulator.mobileStep(".simul_step1");
                    totalResulPrice();
                    /* BTOCSITE-1582 add */
                    $('#quick_buy').hide();
                    /* //BTOCSITE-1582 add */
                }
            };
            var desc = '';
            obj = $.extend(obj, { title: '체험할 제품을 다시 선택하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
            desc = '';
            lgkorUI.confirm(desc, obj);
        });
        //제품 선택하기
        $(document).on("click", ".model_choice_area .btn_model_pick", function() {
            $(this).removeClass("is_noActive").addClass("is_active");
            $(this).closest(".swiper-slide").siblings(".swiper-slide").find(".btn_model_pick").removeClass("is_active").addClass("is_noActive");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide").remove();
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").remove();
            $(".model_choice_area .model_sub_tab_wrap").removeClass("is_active");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head").removeClass("is_active");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont").removeClass("is_active");
            $(".myPick").addClass("border");
            $(".proposeModel").addClass("border");
            modelSimulator.closeMyPickModel();
            modelSimulator.closeProposeModel();
            modelSimulator.childModel($(this));
            modelSimulator.maxCountCheck();

            /* BTOCSITE-1582 add */
            var $objContent = $('.model_experience');
            var $quickbuy = $('#quick_buy');
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ // 210805 BTOCSITE-3487 전자랜드 추가
                if ($(this).data().childcate == 'Y'){
                    $quickbuy.hide();
                } else {
                    $quickbuy.show();
                }
            } else {

            }
            /* //BTOCSITE-1582 add */
            
        });

        //제품선택 탭이벤트
        $(document).on("click", ".model_choice_area .model_sub_tab_wrap .model_sub_tab_head button", function(e) {
            let idx = $(this).closest(".swiper-slide").index();
            $(this).closest(".swiper-slide").addClass("on");
            $(this).closest(".swiper-slide").siblings(".swiper-slide").removeClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide:eq(" + idx + ")").addClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").css("display", "none");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='" + idx + "']").css("display", "inline-block");
            setTimeout(function() {
                slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");
            }, 10);

        });

        //냉장고 상세 제품 선택
        $(document).on("click", ".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick", function(e) {
            $(".btn_model_sub_pick").not(this).removeClass("is_selected");
            $(this).addClass("is_selected");
            let _name = $(this).attr("data-model-typ");
            let name = $(this).attr("data-name");
            let leadName = $(this).attr("data-lead-name");
            let code = $(this).attr("data-default-code");
            let idx = $(".btn_model_pick.is_active").attr("data-index");
            $(".myPick").addClass("border");
            $(".proposeModel").addClass("border");
            modelSimulator.closeMyPickModel();
            modelSimulator.closeProposeModel();
            modelSimulator.stepOneNext(idx, _name, name, code, leadName);
            modelSimulator.maxCountCheck();
            modelSimulator.mobileStep(".simul_step2");
            $(".etc_area").addClass("is_active");
            /* BTOCSITE-1582 add */
            var $objContent = $('.model_experience');
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                $('#quick_buy').show();
            }
            /* //BTOCSITE-1582 add */

        });

        //문선택을 위한 제품 선택(여러제품을 같이 시뮬할 경우)
        $(document).on("click", ".model_set_wrap .btn_model_sel", function(e) {
            $(this).closest(".model_set_wrap").siblings().attr("data-model-editing", 'N');
            $(this).closest(".model_set_wrap").attr("data-model-editing", 'Y');
            modelSimulator.mobileStep(".simul_step2");
            


        });

        //시뮬모델 삭제
        $(document).on("click", ".model_set_wrap .btn_model_del", function(e) {
            let targetDel = $(this);
            var obj = {
                title: '',
                typeClass: '',
                cancelBtnName: '',
                okBtnName: '',
                ok: function() {
                    let idx = targetDel.closest(".model_set_wrap").index();
                    targetDel.closest(".model_set_wrap").remove();
                    $(".model_set_wrap").attr("data-model-add", 'N');
                    $(".model_set_wrap:last-child").attr("data-model-add", 'Y');
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", false);
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
                    if ($(".model_set_wrap").length == 1) {
                        $(".model_set_wrap").attr("data-del", "N");
                    }
                    modelSimulator.maxCountCheck();
                    priceSumList.removeSlide(idx);
                    totalResulPrice();
                }
            };
            var desc = '';
            obj = $.extend(obj, { title: '추가한 제품을 삭제하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
            desc = '';
            lgkorUI.confirm(desc, obj);

        });

        //문짝 선택
        $(document).on("click", ".model_set_wrap .model_door", function() {
            let idx = $(this).index();
            $(".model_set_wrap .model_door").not(this).attr("data-edit", "N");
            $(this).attr("data-edit", "Y");
            modelSimulator.stepTwo(idx);
            $(".color_sel_wrap").addClass("is_active");
            $(".simul_step2 .etc_area").addClass("is_active");
            pickerPosition = $(".color_sel_wrap .swiper-wrapper").css("transform");
        });

        //문짝 색상 선택
        $(document).on("click", ".color_sel_wrap .btn_door_color_sel", function() {
            let _self = this;
            let mCode = $(this).attr("data-m-code");
            let mName = $(this).attr("data-m-name");
            let cCode = $(this).attr("data-c-code");
            let cName = $(this).attr("data-c-name");
            let mixCode = $(this).attr("data-mix-code");
            let doorPrice = $(this).attr("data-door-price");
            let doorCode = $(this).attr("data-door-code");
            let doorKlocation = $(this).attr("data-door-klocation");
            let textColor = $(this).find(".color_name").text();
            let modelCate = $(".model_set_wrap[data-model-editing='Y']").attr("data-model-cate");
            let defaultModelCode = $(".model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            let doorLocation = $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_location");
            let littleCate;
            $(".model_set_wrap[data-model-editing='Y']").attr("data-best") == "N";

            if( $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").length ) {
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_spec_material", mCode);
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_spec_color", cCode);
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-price", doorPrice);
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-code", doorCode);
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-klocation", doorKlocation);
                $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-text", textColor);
            } else {
                lgkorUI.alert("", {
                    title: "색상을 변경할 도어를 선택하세요.",
                    ok: function(el) {
                        
                    }
                }, _self);
            }
            //console.log("modelCate", modelCate);
            if (modelCate == "refrigerator1") {
                modelCate = "refrigerator";
            } else if (modelCate == "refrigerator2") {
                modelCate = "refrigerator";
            }
            //console.log("modelCate", modelCate);
            if (modelCate == "refrigerator") {
                littleCate = "rf";
            } else if (modelCate == "refrigerator_kimchi") {
                littleCate = "rf_kim";
            } else if (modelCate == "refrigerator_convertible") {
                littleCate = "rf_con";
            }
            let doorImgUrl1 = "/lg5-common/images/OBJ/experience/" + modelCate + "/";
            let doorImgUrl2 = littleCate + "_door_" + doorLocation + "_" + mCode + "_" + cCode + ".png";
            let doorImgUrl = doorImgUrl1 + doorImgUrl2;
            let doorImg = '<img src="' + doorImgUrl + '" alt="" />'
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y'] .door_img").html(doorImg);
            $(".model_set_wrap[data-model-editing='Y']").attr("data-best", "N");
            completedCheck();
        });

        //기능가격 비교 선택
        $(document).on("click", ".compare_sel_model_area .tb_compare tbody tr", function() {
            $(this).siblings().removeClass("is_active");
            $(this).addClass("is_active");
            let modelCode = $(this).find("td:first-child span").text();
            let modelPrice = $(this).find("td:last-child span").text();
            $(".model_set_wrap[data-model-editing='Y']").attr("data-model_code", modelCode);
            $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
            if ($(".model_set_wrap[data-model-editing='Y']").attr("data-best") == "Y") {
                let colorMix = $(".model_set_wrap[data-model-editing='Y']").attr("data-best-code").substring(4, 7);
                let mxiCode = modelCode.replace("AAA", colorMix);

                // S - 210723 BTOCSITE-2346 일부 모델 각각 하드코딩처리하여 적용한 내용 일괄 S 적용되도록 변경
                let colorChk = $(".model_set_wrap[data-model-editing='Y']").attr("data-best-code").substring(10);
                // if (mxiCode == "M871FBS551") {
                //     mxiCode = "M871FBS551S";
                // } else if (mxiCode == "M620FBS351S") {
                //     mxiCode = "M620FBS351"
                // } else if (mxiCode == "M871SMS551") {
                //     mxiCode = "M871SMS551S";
                // } else if (mxiCode == "M620SMS351S") {
                //     mxiCode = "M620SMS351";
                // } else if (mxiCode == "M871MWW551") {
                //     mxiCode = "M871MWW551S";
                // } else if (mxiCode == "M620MWW351S") {
                //     mxiCode = "M620MWW351";
                // } else if (mxiCode == "M870FBS451S") {
                //     mxiCode = "M870FBS451";
                // } else if (mxiCode == "M870SMS451") {
                //     mxiCode = "M870SMS451S";
                // } else if (mxiCode == "M870MWW451") {
                //     mxiCode = "M870MWW451S";
                // }
                if(colorChk === "S"){
                    mxiCode = mxiCode + colorChk;
                }
                // E - 210723 BTOCSITE-2346 일부 모델 각각 분기처리하여 적용하던 내용 일괄 S 적용되도록 변경
                $(".model_set_wrap[data-model-editing='Y']").attr("data-best-code", mxiCode);
            }
        });

        //제품 추가하기
        $(document).on("click", ".simul_wrap .model_set_wrap .model_next .btn_model_add", function() {
            let complet = "Y";
            $(".model_set_wrap").each(function() {
                if ($(this).attr("data-model-completed") == "N") {
                    complet = "N";
                }
            });
            if (complet == "Y") {
                $(".simul_wrap").attr("data-add-active", "Y");
                modelSimulator.addSetting();
                modelSimulator.mobileStep(".simul_step1");
            } else {
                let desc = "";
                let obj = {
                    title: '진행중인 제품을 먼저 <br />완성해 주시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
            }
        });

        //구매 합계 열기
        $(".total_price_info_wrap .btn_price_open").on("click", function() {
            $(this).closest(".total_price_info_wrap").addClass("is_active");
        });
        //구매 합계 닫기
        $(".total_price_info_wrap .btn_price_close").on("click", function() {
            $(this).closest(".total_price_info_wrap").removeClass("is_active");
        });
        //견적확인하기
        $(".simul_step3 .btn_check_price").on("click", function() {
            modelCheckdone();
            let $this = $(".simul_wrap .model_set_wrap[data-model-editing='Y']");
            let idx = $this.index();
            let modelCate = $this.attr("data-model-cate");                        
            let defaultModel = $this.attr("data-model_code");
            let defaultPrice = $this.attr("data-model-price");
            let modelName = $this.find(".model_name").text();
            let doorInfo = [];
            let saveInfo = [];            
            saveInfo.push(defaultModel);
            
            $this.find(".door_wrap .model_door").each(function() {
                let info = [];
                info.push($(this).attr("data-door-direction"));
                info.push($(this).attr("data-door-model_location"));
                info.push($(this).attr("data-door-model_spec_material"));
                info.push($(this).attr("data-door-model_spec_color"));
                info.push($(this).attr("data-door-price"));
                info.push($(this).attr("data-door-code"));
                info.push($(this).attr("data-door-text"));
                info.push($(this).attr("data-door-klocation"));
                doorInfo.push(info);
                let doorMix = $(this).attr("data-door-code") + "-" + $(this).attr("data-door-model_spec_material") + $(this).attr("data-door-model_spec_color");
                saveInfo.push(doorMix);
            });
            if ($(".simul_wrap .model_set_wrap[data-model-editing='Y']").attr("data-model-completed") == "Y") {
                var obj = {
                    title: '',
                    typeClass: '',
                    cancelBtnName: '',
                    okBtnName: '',
                    ok: function() {
                        // console.log("saveInfo", saveInfo);
                        myPickSave(saveInfo);
                        //210719 BTOCSITE-2346 CASE별 분기 처리 - S
                        if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                            modelSimulator.mobileStep(".simul_step3");
                        } else {
                            modelSimulator.mobileStep(".simul_step3");
                        }
                        //210719 BTOCSITE-2346 CASE별 분기 처리 - E
                        setTimeout(function() {
                            $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                        }, 500);
                    }
                };
                var desc = '';

                /* 20210622 오브제컬렉션_ 매장 시뮬레이터 */
                if($objContent.attr('data-page-type') === 'COMMON') {
                    obj = $.extend(obj, { title: '체험하신 내용을 저장하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
                    let popLoginCheck = $("meta[name='login']").attr("content");
                    // console.log("popLoginCheck", popLoginCheck);
                    if (popLoginCheck == "" || popLoginCheck === null || popLoginCheck == "null" || popLoginCheck == "undefined" || popLoginCheck === undefined) {
                        desc = '<p class="err-msg save_alert">저장 시 로그인이 필요하며 체험한 제품은 초기화됩니다. <br>해당 제품은 내가 만든 오브제컬렉션에서 확인 가능합니다.</p>';
                    } else {
                        desc = '<p class="err-msg save_alert">저장 시 내가 만든 오브제컬렉션에서 확인 가능합니다.</p>';
                    }
                    lgkorUI.confirm(desc, obj);
                }
                /* //20210622 오브제컬렉션_ 매장 시뮬레이터 */
                /* BTOCSITE-1582 */
                //var $objContent = $('.model_experience');
                if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                    modelSimulator.mobileStep(".simul_step3");
                } else {
                    modelSimulator.mobileStep(".simul_step3");    
                }
                /* //BTOCSITE-1582 */
                
                modelSimulator.priceCheck(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo);
                setTimeout(function() {
                    $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                }, 500);
            } else {
                let desc = "";
                let obj = {
                    title: '모든 컬러 선택 완료 후 <br />견적 확인하시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
            }
            //modelSimulator.mobileStep(".simul_step3");

        });
        //구매하기
        $(document).on("click", ".btn_purchase", function() {
	        let doorInfo = [];
            let saveInfo = []; 
            if (completedCheck() == false){
                let desc = "";
                let obj = {
                    title: '모든 컬러 선택 완료 후 <br />구매하시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
                return;
            } else { 
                //210910 변경 BTOCSITE-4239 - 구매하기시 패널 색상선택값 체크하여 purchaseData 넘김
                if($('.model_experience').attr('data-page-type') === 'NEWBEST' || $('.model_experience').attr('data-page-type') === 'HIMART'  || $('.model_experience').attr('data-page-type') === 'ETLAND') {
                    modelCheckdone();
                    let $this = $(".simul_wrap .model_set_wrap[data-model-editing='Y']");
                    let idx = $this.index();
                    let modelCate = $this.attr("data-model-cate");
                    let defaultModel = $this.attr("data-model_code");
                    let defaultPrice = $this.attr("data-model-price");
                    let modelName = $this.find(".model_name").text();
                    saveInfo.push(defaultModel);
                    
                    $this.find(".door_wrap .model_door").each(function() {
                        let info = [];
                        info.push($(this).attr("data-door-direction"));
                        info.push($(this).attr("data-door-model_location"));
                        info.push($(this).attr("data-door-model_spec_material"));
                        info.push($(this).attr("data-door-model_spec_color"));
                        info.push($(this).attr("data-door-price"));
                        info.push($(this).attr("data-door-code"));
                        info.push($(this).attr("data-door-text"));
                        info.push($(this).attr("data-door-klocation"));
                        doorInfo.push(info);
                        let doorMix = $(this).attr("data-door-code") + "-" + $(this).attr("data-door-model_spec_material") + $(this).attr("data-door-model_spec_color");
                        saveInfo.push(doorMix);
                    });
                }
            }        

            // S - 210723 BTOCSITE-2346 구매하기 데이터 전달값 구조 변경 : 비교하기에서 선택한 default 모델값 전달되도록 변경
            let modelCode = $(".model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            let purchaseData = [];

	        //210910 변경 BTOCSITE-4239 - 구매하기시 패널 색상선택값 체크하여 purchaseData 넘김
            if($('.model_experience').attr('data-page-type') === 'NEWBEST' || $('.model_experience').attr('data-page-type') === 'HIMART'  || $('.model_experience').attr('data-page-type') === 'ETLAND') {
               purchaseData = saveInfo.slice();
            }

            /*
            $(this).closest(".swiper-slide").find(">dl .product_list li").each(function() {
                if (!$(this).hasClass("sum")) {
                    purchaseData.push($(this).attr("data-default-code"));
                }
            });
            */

            //BTOCSITE-3198 패널만 교체/견적 확인하기 각각 적용되는 이벤트 분리 - start
            var plist = $('.total_price_info_wrap .swiper-slide').find(">dl .product_list");
            var plChk = $('.total_price_info_wrap .swiper-slide').find(">dl .product_list li.is_active");
            if(plist.hasClass("pannel_list")){
                //패널만 교체
                if(plChk.length && $('.sum').css('display') == 'flex'){
                    plChk.each(function() {
                        if (!$(this).hasClass("sum")) {
                            $(this).attr("data-default-code");
                            //BTOCSITE-4239 210910 변경
                            if($('.model_experience').attr('data-page-type') === 'COMMON') {
                            purchaseData.push($(this).attr("data-default-code"));
                            }
                        }
                    });
                } else if(plChk.length && $('.sum').css('display') == 'none') {
                    let desc = "";
                    let obj = {
                        title: '선택 제품의 총 금액을 확인하여 주십시오.'
                    };
                    lgkorUI.alert(desc, obj);
                    return;
                } else {
                    let desc = "";
                    let obj = {
                        title: '구매하고자 하는 패널을 선택하여 주십시오.'
                    };
                    lgkorUI.alert(desc, obj);
                    return;
                }
            } else {
                //견적 확인하기
                plist.each(function(index) {
                    if (!$(this).hasClass("sum")) {
                        if(index == 0) {
                            $(this).attr("data-default-code",modelCode);
                        } else {
                            $(this).attr("data-default-code");
                        }
                        //BTOCSITE-4239 210910 변경
                        if($('.model_experience').attr('data-page-type') === 'COMMON') {
                            purchaseData.push($(this).attr("data-default-code"));
                        }
                    }
                });
            }
            //BTOCSITE-3198 패널만 교체/견적 확인하기 각각 적용되는 이벤트 분리 - end
            
            // E - 210723 BTOCSITE-2346 구매하기 데이터 전달값 구조 변경 : 비교하기에서 선택한 default 모델값 전달되도록 변경
            //console.log('selectedMFodelData', selectedModelData);
            //console.log('purchaseData', purchaseData);

            // S - 210722 BTOCSITE-2346 추천제품 정보값 변경
            // var selectedModelData = $('.total_price_info_wrap .swiper-slide').find(">dl").eq(0).data();
            var selectedModelData = '';
            if ($(".model_set_wrap[data-model-editing='Y']").attr("data-best") == "Y") {
                selectedModelData = $(".model_set_wrap[data-model-editing='Y']").attr("data-best-code");
            } else {
                selectedModelData = $(".model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            }
            // E - 210722 BTOCSITE-2346 추천제품 정보값 변경
            for (let i = 0; i < proposeSet.proposeConfig.length; i++) {
                if (purchaseData[0] == proposeSet.proposeConfig[i].modelCode) {
                    purchaseData = [];
                    if (proposeSet.proposeConfig[i].defaultCode != "") {
                        purchaseData.push(proposeSet.proposeConfig[i].defaultCode);
                    }
                    if (proposeSet.proposeConfig[i].door1 != "") {
                        purchaseData.push(proposeSet.proposeConfig[i].door1);
                    }
                    if (proposeSet.proposeConfig[i].door2 != "") {
                        purchaseData.push(proposeSet.proposeConfig[i].door2);
                    }
                    if (proposeSet.proposeConfig[i].door3 != "") {
                        purchaseData.push(proposeSet.proposeConfig[i].door3);
                    }
                    if (proposeSet.proposeConfig[i].door4 != "") {
                        purchaseData.push(proposeSet.proposeConfig[i].door4);
                    }
                }
            }
            //console.log(purchaseData);

            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                // BTOCSITE-2346 newbest, himart일 경우 datasend 데이터 전달값 변경 - 210721 - start
                datasend(0, selectedModelData ? selectedModelData : '', purchaseData); 
                // BTOCSITE-2346 newbest, himart일 경우 datasend 데이터 전달값 변경 - 210721 - end
            } else {
                // BTOCSITE-3198 패널만 교체용 함수 분리 - S
                if(plist.hasClass("pannel_list")){
                    //패널만 교체용
                    purchaseFnPannel(purchaseData);
                } else {
                    //기존 견적 확인하기용
                    purchaseFn(purchaseData);
                }
                // BTOCSITE-3198 패널만 교체용 함수 분리 - E
            }
            

        });
        //툴팁
        $(".obj_tooltip_wrap .tooltip-icon").on("click", function() {
            if ($(this).closest(".obj_tooltip_wrap").hasClass("active")) {
                $(this).closest(".obj_tooltip_wrap").removeClass("active");
            } else {
                $(this).closest(".obj_tooltip_wrap").addClass("active");
                materiaModal.update();
            }
        });
        //툴팁 닫기
        $(".obj_tooltip_wrap .btn-close").on("click", function() {
            $(this).closest(".obj_tooltip_wrap").removeClass("active");
        });


        //시뮬모델 Swiper
        simulBodySwiper = new Swiper('.simul_wrap.swiper-container', {
            //slidesPerView: 3,
            slidesPerView: 'auto',
            spaceBetween: 0,
            // centeredSlides: true,
            // centeredSlidesBounds: true,
            freeMode: true,
            navigation: {
                nextEl: '.simul_wrap .swiper-button-next',
                prevEl: '.simul_wrap .swiper-button-prev',
            },

        });
        // var swiper = new Swiper('.swiper-container', {
        //     slidesPerView: 3,
        //     slidesPerColumn: 2,
        //     spaceBetween: 30,
        //     pagination: {
        //       el: '.swiper-pagination',
        //       clickable: true,
        //     },
        //   });
        //합계 Swiper
        priceSumList = new Swiper(".total_price_info_body .swiper-container", {
            slidesPerView: 1,
            //slidesPerView: 'auto',
            spaceBetween: 0,
            // preventClicks: false,
            // preventClicksPropagation: false,
            navigation: {
                nextEl: '.total_price_info_body .swiper-button-next',
                prevEl: '.total_price_info_body .swiper-button-prev',
            },
            /*breakpoints: {
                // when window width is >= 320px
                280: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                // when window width is >= 480px
                767: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                // when window width is >= 640px
                900: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }*/
        });
        //도어 재질 Swiper
        materiaModal = new Swiper(".obj_tooltip_wrap .material_modal", {
            //slidesPerView: 1,
            centeredSlides: true,
            //slidesPerView: 'auto',
            //spaceBetween: 40,
            // preventClicks: false,
            // preventClicksPropagation: false,
            navigation: {
                nextEl: '.material_modal .swiper-button-next',
                prevEl: '.material_modal .swiper-button-prev',
            },
        });

    });
    var simulBodySwiper;
    var priceSumList;
    var materiaModal;
    var modelSubTabCont;

    function simulPositionAutoMove() { //화면 넓이에 따른 시뮬레이션 위치 변경 및 위치 따라다니기
        let simulLand;
        if ($(window).width() > 767) {
            simulLand = $(".model_simul_area.area1"); //pc버전
        } else {
            simulLand = $(".model_simul_area.area2"); //모바일버전
        }
        let landT = simulLand.offset().top;
        let landL = simulLand.offset().left;
        let landW = simulLand.width();
        let landH = simulLand.height();
        let scrollT = $(window).scrollTop();
        let scrollL = $(window).scrollLeft();
        $(".simul_wrap").css({
            "left": (landL - scrollL),
            "top": (landT - scrollT),
            "width": landW,
            "height": landH
        });
    }
    //화면 사이즈에 따른 Swiper 업데이트
    function slideWrapAutoSize(slideTarget) {
        let slideLeng = $(slideTarget).find(".swiper-slide").length;
        let slideW = $(slideTarget).find(".swiper-slide").width();
        $(slideTarget).find(".swiper-slide").each(function() {
            if ($(this).css("display") == "none") {
                slideLeng = slideLeng - 1;
            }
        });
        let slideWrapW = (slideW * slideLeng);
         //210726 BTOCSITE-2346 "베이직" 일때, step2 우측으로 쏠려서 조합제품 안보이는 문제가 있어 width 고정값 적용 - Start
        let subPickChkBasic = $('.btn_model_sub_pick[data-name="베이직"]');         
        let subPickChkDoor4 = $('.btn_model_sub_pick[data-name="4도어"]'); //4도어 추가 BTOCSITE-4239 210915
        let subPickChkDoor3 = $('.btn_model_sub_pick[data-name="3도어"]'); //3도어 추가 BTOCSITE-4239 210915
        //210906 BTOCSITE-4239 "4도어" 일때,  step2 우측으로 쏠려서 조합제품 안보이는 문제가 있어 width 고정값 적용 - Start
        if(subPickChkBasic.hasClass("is_selected") == true || subPickChkDoor4.hasClass("is_selected") == true || subPickChkDoor3.hasClass("is_selected") == true){
            $(slideTarget).find(".swiper-wrapper").css("width", "580px");
        }else{
            $(slideTarget).find(".swiper-wrapper").css("width", slideWrapW);                       
        }
        //210726 BTOCSITE-2346 "베이직" 일때, step2 우측으로 쏠려서 조합제품 안보이는 문제가 있어 width 고정값 적용 - Start
        modelSubTabCont = new Swiper(slideTarget, {
            slidesPerView: 'auto',
            freeMode: true,
            preventClicks: false,
            preventClicksPropagation: false,
            navigation: {
                nextEl: slideTarget + ' .swiper-button-next',
                prevEl: slideTarget + ' .swiper-button-prev',
            },
        });
    }
    //도어 선택이 완료되었는지 체크
    function completedCheck() {
        let completed = "Y";
        $(".model_set_wrap[data-model-editing='Y'] .model_door").each(function() {
            if ($(this).find(".door_img img").length == 0) {
                completed = "N";
            }
        });

        if (completed == "Y") {
            modelSimulator.stepThree();
            return true;
        } else {
            return false;
            //alert('선택완료안됨');
        }
    }

    function modelCheckdone() {
        let completed = "Y";
        $(".model_set_wrap[data-model-editing='Y'] .model_door").each(function() {
            if ($(this).find(".door_img img").length == 0) {
                completed = "N";
            }
        });
        if (completed == "Y") {
            $(".model_set_wrap[data-model-editing='Y']").attr("data-model-completed", completed);
        }
    }


    //시뮬레이션 
    modelSimulator = {
        //초기화
        init: function() {
            let simulModelLeng = configData.modelConfig.length;
            let modelChoiceHtml = "";
            for (let i = 0; i < simulModelLeng; i++) {
                let childCate = "";
                if (configData.modelConfig[i].refrigeratorType) {
                    childCate = "Y";
                } else if (configData.modelConfig[i].typModel) {
                    childCate = "Y";
                } else {
                    childCate = "N";
                }
                modelChoiceHtml += '<div class="swiper-slide"><button type="button" data-name="' + configData.modelConfig[i].name + '" data-childCate="' + childCate + '" data-index="' + i + '" data-lead-name="' + configData.modelConfig[i].id + '" class="btn_model_pick"><span class="pic"><img src="' + configData.modelConfig[i].leaderImg + '" alt=""/></span><span class="model_name">' + configData.modelConfig[i].name + '</span></button></div>';
            }
            $('.model_choice_area .model_choice_tab .swiper-wrapper').html(modelChoiceHtml);
            if (simulModelLeng > 3) {
                var modelChoiceTab = new Swiper('.model_choice_area .model_choice_tab', {
                    //slidesPerView: 3,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    freeMode: true,
                    navigation: {
                        nextEl: '.model_choice_area .model_choice_tab .swiper-button-next',
                        prevEl: '.model_choice_area .model_choice_tab .swiper-button-prev',
                    },
                });
            }


        },
        //시뮬모델 최대 수량
        maxCountCheck: function() {
            let maxSetting = 5;
            let maxCount = 0;
            setTimeout(function() {
                $(".simul_wrap .simul_body .model_set_wrap").each(function() {
                    //console.log('$(this).attr("data-model-cate")', $(this).attr("data-model-cate"));
                    if ($(this).attr("data-model-cate") == "refrigerator1") {
                        maxCount += 2;
                    } else if ($(this).attr("data-model-cate") == "refrigerator2") {
                        maxCount += 2;
                    } else if ($(this).attr("data-model-cate") == "refrigerator_kimchi") {
                        maxCount += 1;
                    } else if ($(this).attr("data-model-cate") == "refrigerator_convertible") {
                        maxCount += 1;
                    }
                });
                //$(".model_set_wrap").attr("data-model-add", "N");
                if (maxCount == (maxSetting - 1)) {
                    $(".model_set_wrap:last-child").attr("data-model-add", "Y");
                    $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='refrigerator']").prop("disabled", true);
                } else if (maxCount == maxSetting) {
                    $(".model_set_wrap:last-child").attr("data-model-add", "N");
                } else if (maxCount > maxSetting) {
                    $(".model_set_wrap:last-child").attr("data-model-add", "N");
                } else {
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", false);
                }
                if (!$(".total_price_info_wrap .total_price_info_body .swiper-slide").length > 0) {
                    $(".total_price_info_wrap").attr("data-sum-active", "N");
                } else {
                    $(".total_price_info_wrap").attr("data-sum-active", "Y");
                }
            }, 200);

        },
        //시뮬모델 추가하기
        addSetting: function() {
            modelSimulator.init();
            $(".model_sub_tab_wrap").removeClass("is_active");
            $(".model_sub_tab_wrap .model_sub_tab_head").removeClass("is_active");
            $(".model_sub_tab_wrap .model_sub_tab_cont").removeClass("is_active");
            $(".color_mixing_area .color_sel_wrap").removeClass("is_active");
            $(".color_mixing_area .color_my_pick").removeClass("is_active");
            $(".color_mixing_area .color_best").removeClass("is_active");
            $(".simul_step2 .etc_area").removeClass("is_active");
            $(".simul_step3 .etc_area").removeClass("is_active");
            $(".simul_step3 .compare_sel_model_area").removeClass("is_active");
            $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
            $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
            $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "top", 0);
            modelSimulator.maxCountCheck();
            modelSimulator.closeProposeModel();

        },
        childModel: function(_target) { //하위 카테고리가 있는지 여부 판단
            let _this = _target;
            let hasChild = _this.attr("data-childcate");
            let idx = _this.attr("data-index");
            let _name = _this.attr("data-lead-name");
            let name = _this.attr("data-name");
            if (hasChild == "Y") {
                modelSimulator.makeModelTab(idx, _name);
            } else {
                modelSimulator.stepOneNext(idx, _name, name);
                modelSimulator.mobileStep(".simul_step2");
                $(".etc_area").addClass("is_active");
            }
        },
        makeModelTab: function(idx, _name) { //하위 카테고리가 있을경우 탭을 생성
            let tabHeadHtml = '';
            let tabBodyHtml = '';
            let rollingTab = [];
            if (idx == 0) { //냉장고
                let tabLeng = configData.modelConfig[idx].refrigeratorType.length;
                for (let i = 0; i < tabLeng; i++) {
                    let tabName = configData.modelConfig[idx].refrigeratorType[i].typeName;
                    let tabSubLeng = configData.modelConfig[idx].refrigeratorType[i].typModel.length;
                    let modelTyp = configData.modelConfig[idx].refrigeratorType[i].typ;
                    rollingTab.push(tabSubLeng);
                    tabHeadHtml += '<div class="swiper-slide"><button type="button" data-model-typ="' + modelTyp + '">' + tabName + '</button></div>';
                    for (let j = 0; j < tabSubLeng; j++) {
                        tabBodyHtml += '<div class="swiper-slide" data-typ-filter="' + i + '">';
                        tabBodyHtml += '    <button type="button" data-index="' + j + '" data-name="' + configData.modelConfig[idx].refrigeratorType[i].typModel[j].name + '" data-lead-name="' + configData.modelConfig[idx].id + '" data-model-typ="' + modelTyp + '" data-default-code="' + configData.modelConfig[idx].refrigeratorType[i].typModel[j].defaultCode + '" class="btn_model_sub_pick">';
                        tabBodyHtml += '        <span class="pic"><img src="' + configData.modelConfig[idx].refrigeratorType[i].typModel[j].leaderImg + '" alt=""/></span>';
                        tabBodyHtml += '        <span class="model_name">' + configData.modelConfig[idx].refrigeratorType[i].typModel[j].name + '</span>';
                        tabBodyHtml += '    </button>';
                        tabBodyHtml += '</div>';
                    }
                }
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head").addClass("is_active");
            } else if (idx == 1) { //김치냉장고
                let tabSubLeng = configData.modelConfig[idx].typModel.length;
                for (let j = 0; j < tabSubLeng; j++) {
                    tabBodyHtml += '<div class="swiper-slide" data-typ-filter="0">';
                    tabBodyHtml += '    <button type="button" data-index="' + j + '" data-name="' + configData.modelConfig[idx].typModel[j].name + '" data-lead-name="' + configData.modelConfig[idx].id + '" data-default-code="' + configData.modelConfig[idx].typModel[j].defaultCode + '" class="btn_model_sub_pick">';
                    tabBodyHtml += '        <span class="pic"><img src="' + configData.modelConfig[idx].typModel[j].leaderImg + '" alt=""/></span>';
                    tabBodyHtml += '        <span class="model_name">' + configData.modelConfig[idx].typModel[j].name + '</span>';
                    tabBodyHtml += '    </button>';
                    tabBodyHtml += '</div>';
                }
            } else if (idx == 2) { //컨버터블
                let tabSubLeng = configData.modelConfig[idx].typModel.length;
                for (let j = 0; j < tabSubLeng; j++) {
                    tabBodyHtml += '<div class="swiper-slide" data-typ-filter="0">';
                    tabBodyHtml += '    <button type="button" data-index="' + j + '" data-name="' + configData.modelConfig[idx].typModel[j].name + '" data-lead-name="' + configData.modelConfig[idx].id + '" data-default-code="' + configData.modelConfig[idx].typModel[j].defaultCode + '" class="btn_model_sub_pick">';
                    tabBodyHtml += '        <span class="pic"><img src="' + configData.modelConfig[idx].typModel[j].leaderImg + '" alt=""/></span>';
                    tabBodyHtml += '        <span class="model_name">' + configData.modelConfig[idx].typModel[j].name + '</span>';
                    tabBodyHtml += '    </button>';
                    tabBodyHtml += '</div>';
                }
            }

            //$(".model_choice_area .model_sub_tab_wrap").remove();
            $(".model_choice_area .model_sub_tab_wrap").addClass("is_active");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont").addClass("is_active");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper").html(tabHeadHtml);
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper").html(tabBodyHtml);
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide:eq(0)").addClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").css("display", "none");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='0']").css("display", "inline-block");
            setTimeout(function() {
                slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");
            }, 10);


        },
        stepOneNext: function(idx, _name, name, code, leadName) { //2단계로 넘어간다
            $(".model_simul_area").addClass("is_active");
            $(".simul_wrap").addClass("is_active");
            let simulBodyHtml = '<div data-model-cate="" data-model_code="" data-best="N" data-best-code="" data-del="N" data-model-add="Y" data-model-editing="Y" data-model-completed="N" class="swiper-slide model_set_wrap">';
            simulBodyHtml += '  <div class="model_set">';
            simulBodyHtml += '      <button type="button" class="btn_model_del"><span class="blind">선택 제품 삭제</span></button>';
            simulBodyHtml += '      <button type="button" class="btn_model_sel"><span class="blind">제품 선택</span></button>';
            simulBodyHtml += '      <div class="sel_model_set">';
            simulBodyHtml += '          <div class="door_wrap">';
            simulBodyHtml += '          </div>';
            simulBodyHtml += '          <div class="default_img"></div>';
            simulBodyHtml += '      </div>';
            simulBodyHtml += '      <span class="model_name"></span>';
            simulBodyHtml += '  </div>';
            simulBodyHtml += '  <div class="model_next">';
            simulBodyHtml += '      <button type="button" class="btn_model_add"><span class="blind">제품 추가</span></button>';
            simulBodyHtml += '  </div>';
            simulBodyHtml += '</div>';
            $(".model_set_wrap").attr({ "data-model-editing": 'N', "data-model-add": "N" });
            let modelAdd = "Y";
            $(".model_set_wrap").each(function() {
                if ($(this).attr("data-model-completed") == "N") {
                    modelAdd = "N"
                }
            });
            let addActive = $(".simul_wrap").attr("data-add-active");
            setTimeout(function() {
                if (modelAdd == "Y" && addActive == "Y") {
                    simulBodySwiper.appendSlide(simulBodyHtml);
                    // $(".simul_body").append(simulBodyHtml);
                    // simulBodySwiper.updateSlides();
                    $(".simul_wrap").attr("data-add-active", "N");
                    simulBodySwiper.updateSlides();
                } else {
                    if ($(".model_set_wrap").length == 0) {
                        //simulBodySwiper.addSlide(simulBodyHtml);
                        simulBodySwiper.destroy();
                        $(".simul_body").html(simulBodyHtml);

                        simulBodySwiper = new Swiper('.simul_wrap.swiper-container', {
                            //slidesPerView: 3,
                            slidesPerView: 'auto',
                            spaceBetween: 0,
                            // centeredSlides: true,
                            // centeredSlidesBounds: true,
                            freeMode: true,
                            navigation: {
                                nextEl: '.simul_wrap .swiper-button-next',
                                prevEl: '.simul_wrap .swiper-button-prev',
                            },

                        });
                        //제품 스와이프 슬라이드
                        simulPositionAutoMove();
                    } else {
                        let selDoorLeng = "Y";
                        let editingModel = $(".model_set_wrap");
                        editingModel.each(function() {
                            selDoorLeng = "Y";
                            $(this).find(".door_wrap .model_door").each(function() {
                                if ($(this).find(".door_img img").length) {
                                    selDoorLeng = "N"
                                }
                            });
                            if (selDoorLeng == "Y") {
                                let delIdx = $(this).index();
                                simulBodySwiper.removeSlide(delIdx)
                                    //$(this).remove();
                            }
                        });
                        simulBodySwiper.appendSlide(simulBodyHtml);
                        // $(".simul_body").append(simulBodyHtml);
                        simulBodySwiper.updateSlides();
                    }
                    let selDoorLeng = "Y";
                    $(".model_set_wrap[data-model-editing='Y']").find(".door_wrap .model_door").each(function() {
                        if ($(this).find(".door_img img").length) {
                            selDoorLeng = "N"
                        }
                    });


                }
                //$(".simul_body").html(simulBodyHtml);
                let modelWrap = $(".model_set_wrap[data-model-editing='Y']");
                let modelPrice;
                let defaultImg = '';
                let doorHtml = '';
                let doorPrice = '';
                let doorKLocation = '';
                if (idx == 0) { //냉장고
                    modelWrap.attr({ "data-model-cate": _name, "data-model_code": code });
                    let forLeng = configData.modelConfig[idx].refrigeratorType.length;
                    for (let i = 0; i < forLeng; i++) {
                        if (_name == configData.modelConfig[idx].refrigeratorType[i].typ) {
                            let forLeng2 = configData.modelConfig[idx].refrigeratorType[i].typModel.length;
                            for (let j = 0; j < forLeng2; j++) {
                                if (code == configData.modelConfig[idx].refrigeratorType[i].typModel[j].defaultCode) {
                                    modelPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].defaultPrice;
                                    defaultImg = configData.modelConfig[idx].refrigeratorType[i].typModel[j].simulImg;
                                    doorLeng = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.count;
                                    $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
                                    if (doorLeng == 3) {
                                        for (let k = 0; k < doorLeng; k++) {
                                            let doorDirection;
                                            let doorLocation;
                                            if (k == 0) {
                                                doorDirection = "LT";
                                                doorLocation = "TT";
                                                doorKLocation = "상단(좌)";
                                                if (code == "W821AAA453") {
                                                    doorDirection = "LT";
                                                    doorLocation = "JT";
                                                    doorKLocation = "얼음정수기 상단(좌)";
                                                }
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door1.defaultPrice;
                                            } else if (k == 1) {
                                                doorDirection = "LB";
                                                doorLocation = "BB";
                                                doorKLocation = "하단(좌)";
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door2.defaultPrice;
                                            } else if (k == 2) {
                                                doorDirection = "RB";
                                                doorLocation = "BB";
                                                doorKLocation = "하단(우)";
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door3.defaultPrice;
                                            }
                                            doorHtml += '<button type="button" data-edit="N" data-door-klocation="' + doorKLocation + '" data-door-price="' + doorPrice + '" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                            doorHtml += '   <span class="blind">도어 선택</span>';
                                            doorHtml += '   <span class="door_img"></span>';
                                            doorHtml += '</button>';
                                        }
                                    } else if (doorLeng == 4) {
                                        for (let k = 0; k < doorLeng; k++) {
                                            let doorDirection;
                                            let doorLocation;
                                            if (k == 0) {
                                                doorDirection = "LT";
                                                doorLocation = "TT";
                                                doorKLocation = "상단(좌)";
                                                //210719 BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 제품 추가 - S
                                                if (code == "W821AAA153") {
                                                    doorDirection = "LT";
                                                    doorLocation = "JT";
                                                    doorKLocation = "얼음정수기 상단(좌)";
                                                }
                                                //210719 BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 제품 추가 - E
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door1.defaultPrice;
                                            } else if (k == 1) {
                                                doorDirection = "RT";
                                                doorLocation = "TT";
                                                doorKLocation = "상단(우)";
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door2.defaultPrice;
                                            } else if (k == 2) {
                                                doorDirection = "LB";
                                                doorLocation = "BB";
                                                doorKLocation = "하단(좌)";
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door3.defaultPrice;
                                            } else if (k == 3) {
                                                doorDirection = "RB";
                                                doorLocation = "BB";
                                                doorKLocation = "하단(우)";
                                                doorPrice = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.door4.defaultPrice;
                                            }
                                            doorHtml += '<button type="button" data-edit="N" data-door-klocation="' + doorKLocation + '" data-door-price="' + doorPrice + '" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                            doorHtml += '   <span class="blind">도어 선택</span>';
                                            doorHtml += '   <span class="door_img"></span>';
                                            doorHtml += '</button>';
                                        }
                                    }
                                }
                            }
                        }
                    }

                } else if (idx == 1) { //김치냉장고 - BTOCSITE-4239 수정 3도어/4도어 추가
                    modelWrap.attr({ "data-model-cate": leadName, "data-model_code": code });
                    let forLeng = configData.modelConfig[idx].typModel.length;
                    for (let i = 0; i < forLeng; i++) {
                        if (code == configData.modelConfig[idx].typModel[i].defaultCode) {
                            defaultImg = configData.modelConfig[idx].typModel[i].simulImg;
                            modelPrice = configData.modelConfig[idx].typModel[i].defaultPrice;
                            doorLeng = configData.modelConfig[idx].typModel[i].door.count;
                            doorPrice = configData.modelConfig[idx].typModel[i].door.door1.defaultPrice;
                            $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
                            if (doorLeng == 3) {
                                for (let k = 0; k < doorLeng; k++) {
                                    let doorDirection;
                                    let doorLocation;
                                    if (k == 0) {
                                        doorDirection = "TT";
                                        doorLocation = "TT";
                                        doorKLocation = "상칸";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door1.defaultPrice;
                                    } else if (k == 1) {
                                        doorDirection = "MM";
                                        doorLocation = "MM";
                                        doorKLocation = "중칸";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door2.defaultPrice;
                                    } else if (k == 2) {
                                        doorDirection = "BB";
                                        doorLocation = "BB";
                                        doorKLocation = "하칸";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door3.defaultPrice;
                                    }
                                    doorHtml += '<button type="button" data-edit="N" data-door-klocation="' + doorKLocation + '" data-door-price="' + doorPrice + '" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                    doorHtml += '   <span class="blind">도어 선택</span>';
                                    doorHtml += '   <span class="door_img"></span>';
                                    doorHtml += '</button>';
                                }
                            } else if (doorLeng == 4) { //BTOCSITE-4239 4도어 9/17 운영 이관예정 - 3도어만 선반영진행(9/13)
                                for (let k = 0; k < doorLeng; k++) {
                                    let doorDirection;
                                    let doorLocation;
                                    if (k == 0) {
                                        doorDirection = "LT";
                                        doorLocation = "TT";
                                        doorKLocation = "상칸(좌)";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door1.defaultPrice;
                                    } else if (k == 1) {
                                        doorDirection = "RT";
                                        doorLocation = "TT";
                                        doorKLocation = "상칸(우)";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door2.defaultPrice;
                                    } else if (k == 2) {
                                        doorDirection = "MM";
                                        doorLocation = "BB";
                                        doorKLocation = "중칸";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door3.defaultPrice;
                                    } else if (k == 3) {
                                        doorDirection = "BB";
                                        doorLocation = "BB";
                                        doorKLocation = "하칸";
                                        doorPrice = configData.modelConfig[idx].typModel[i].door.door4.defaultPrice;
                                    }
                                    doorHtml += '<button type="button" data-edit="N" data-door-klocation="' + doorKLocation + '" data-door-price="' + doorPrice + '" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                    doorHtml += '   <span class="blind">도어 선택</span>';
                                    doorHtml += '   <span class="door_img"></span>';
                                    doorHtml += '</button>';
                                }
                            }
                        }
                    }
                    ////console.log("code", code);
                } else if (idx == 2) { //컨버터블
                    //code = configData.modelConfig[idx].typModel[i].defaultCode;
                    modelWrap.attr({ "data-model-cate": leadName, "data-model_code": code });
                    let forLeng = configData.modelConfig[idx].typModel.length;
                    for (let i = 0; i < forLeng; i++) {
                        if (code == configData.modelConfig[idx].typModel[i].defaultCode) {
                            defaultImg = configData.modelConfig[idx].typModel[i].simulImg;
                            modelPrice = configData.modelConfig[idx].typModel[i].defaultPrice;
                            doorLeng = configData.modelConfig[idx].typModel[i].door.count;
                            doorPrice = configData.modelConfig[idx].typModel[i].door.door1.defaultPrice;
                            $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
                            if (doorLeng == 1) {
                                let doorDirection = "TT";
                                let doorLocation = "TT";
                                doorKLocation = "도어"
                                doorHtml += '<button type="button" data-edit="N" data-door-price="' + doorPrice + '" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                doorHtml += '   <span class="blind">도어 선택</span>';
                                doorHtml += '   <span class="door_img"></span>';
                                doorHtml += '</button>';
                            }
                        }

                    }

                }

                defaultImg = '<img src="' + defaultImg + '" alt="" />';
                modelWrap.find(".default_img").html(defaultImg);
                modelWrap.find(".door_wrap").html(doorHtml);
                modelWrap.find(".model_name").text(name);
                // modelWrap.attr({ "data-model-editing": "Y" });
                if ($(".model_set_wrap").length > 1) {
                    $(".model_set_wrap").each(function() {
                        $(this).attr("data-del", "Y");
                    });
                }
                setTimeout(function() {
                    simulPositionAutoMove();
                    simulBodySwiper.update();
                }, 100);

            }, 100);






        },
        //모바일 스크롤 위치이동
        mobileStep: function(target) {
            if ($(window).width() > 767) {
                //pc버전
            } else {
                //모바일버전
                //console.log("target", target);
                let goTop = $(target).offset().top - $(".objetcollection-tabs").height();
                //console.log("goTop", goTop);
                $("html, body").animate({ scrollTop: goTop }, 500);
            }
        },
        //제품에 따른 컬러피커 생성
        stepTwo: function(idx) {

            let modelCate = $(".model_choice_tab .btn_model_pick.is_active").attr("data-lead-name");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let doorDirection = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-direction");
            let doorLocation = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-model_location");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            let modalTitle = [];
            let modalTitle2 = [];
            let modalTxt = [];
            let modalImg = [];
            if (modelCate == "refrigerator") {
                let refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType.length;
                for (let i = 0; i < refrigeratorTypeLeng; i++) {
                    if (configData.modelConfig[0].refrigeratorType[i].typ == modelCate2) {
                        let typModelLeng = refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType[i].typModel.length;
                        for (let j = 0; j < typModelLeng; j++) {
                            if (configData.modelConfig[0].refrigeratorType[i].typModel[j].defaultCode == modelCode || (configData.modelConfig[0].refrigeratorType[i].typModel[j].subModel != "undefined" && configData.modelConfig[0].refrigeratorType[i].typModel[j].subModel != undefined && configData.modelConfig[0].refrigeratorType[i].typModel[j].subModel[0].modelCode == modelCode)) { //BTOCSITE-4239 추가 - 2번째 모델이 있을 경우, 2번째모델 선택시 dfaultModel과 modelCode 달라서 해당 컬러칩영역 노출 안되는 문제 발생 -> 조건 추가함(서브모델과 현재 modelCode 비교 조건) 
                                let doorMaterialLeng = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData.length;
                                let _door;
                                let _doorFrontCode;
                                let _doorLocation;
                                let doorPrice;
                                if (idx == 0) {
                                    _door = configData.modelConfig[0].refrigeratorType[i].typModel[j].door.door1;
                                } else if (idx == 1) {
                                    _door = configData.modelConfig[0].refrigeratorType[i].typModel[j].door.door2;
                                } else if (idx == 2) {
                                    _door = configData.modelConfig[0].refrigeratorType[i].typModel[j].door.door3;
                                } else if (idx == 3) {
                                    _door = configData.modelConfig[0].refrigeratorType[i].typModel[j].door.door4;
                                }
                                //console.log("_door", _door);
                                doorPrice = _door.defaultPrice;
                                //console.log("doorPrice", doorPrice);
                                _doorLocation = _door.name;
                                _doorFrontCode = _door.code;
                                let colorSelBodyHtml = '';
                                for (let k = 0; k < doorMaterialLeng; k++) {
                                    let doorColorLeng = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.doorColor.length;
                                    let doorMaterialName = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.name;
                                    let doorMaterialEnName = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.enName;
                                    let doorMaterialDesc = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.desc;
                                    let doorMaterialDescImg = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.descImg;
                                    let doorMaterialCode = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.code;
                                    modalTitle.push(doorMaterialName);
                                    modalTitle2.push(doorMaterialEnName);
                                    modalTxt.push(doorMaterialDesc);
                                    modalImg.push(doorMaterialDescImg);
                                    colorSelBodyHtml += '<div class="swiper-slide">';
                                    colorSelBodyHtml += '   <dl>';
                                    colorSelBodyHtml += '       <dt>' + doorMaterialName + '</dt>';
                                    colorSelBodyHtml += '       <dd>';
                                    colorSelBodyHtml += '           <ul>';
                                    for (let l = 0; l < doorColorLeng; l++) {
                                        let doorColorName = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.doorColor[l].name;
                                        let doorColorCode = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.doorColor[l].code;
                                        let doorColorMixingCode = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.doorColor[l].mixingCode;
                                        let colorImgUrl = '/lg5-common/images/OBJ/experience/color/';
                                        let colorImgName = 'color_' + doorMaterialCode + '_' + doorColorCode + '.png';
                                        let colorHtml = '<li>';
                                        colorHtml += '  <button type="button" data-door-code="' + _doorFrontCode + '" data-door-klocation="' + _doorLocation + '" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" data-door-price="' + doorPrice + '" class="btn_door_color_sel">';
                                        colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                                        //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (소재명 제거)
                                        // colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>'; 
                                        colorHtml += '      <span class="color_name">' + doorColorName + '</span>';
                                        colorHtml += '  </button>';
                                        colorHtml += '</li>';
                                        colorSelBodyHtml += colorHtml;
                                    }
                                    colorSelBodyHtml += '           <ul>';
                                    colorSelBodyHtml += '       </dd>';
                                    colorSelBodyHtml += '   </dl>';
                                    colorSelBodyHtml += '</div>';
                                }
                                $(".color_sel_wrap").addClass("is_active");
                                $(".simul_step2 .etc_area").addClass("is_active");
                                $(".color_sel_wrap .color_sel_body .swiper-wrapper").html(colorSelBodyHtml);
                                setTimeout(function() {
                                    slideWrapAutoSize(".color_sel_wrap .color_sel_body");
                                }, 10);

                                break;
                               }
                        }
                        break;
                    }
                }
            } else if (modelCate == "refrigerator_kimchi") {
                let typModelLeng = configData.modelConfig[1].typModel.length;
                //doorPrice = door.defaultPrice; 
                for (let j = 0; j < typModelLeng; j++) {
                    if (configData.modelConfig[1].typModel[j].defaultCode == modelCode || (configData.modelConfig[1].typModel[j].subModel != "undefined" && configData.modelConfig[1].typModel[j].subModel != undefined && configData.modelConfig[1].typModel[j].subModel[0].modelCode == modelCode)) { //BTOCSITE-4239 추가 - 2번째 모델이 있을 경우, 2번째모델 선택시 dfaultModel과 modelCode 달라서 해당 컬러칩영역 노출 안되는 문제 발생 -> 조건 추가함(서브모델과 현재 modelCode 비교 조건)
                        let doorMaterialLeng = configData.modelConfig[1].typModel[j].doorColorData.length;
                        let colorSelBodyHtml = '';
                        for (let k = 0; k < doorMaterialLeng; k++) {
                            let doorColorLeng = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.doorColor.length;
                            let doorMaterialName = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.name;
                            let doorMaterialEnName = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.enName;
                            let doorMaterialCode = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.code;
                            let doorMaterialDesc = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.desc;
                            let doorMaterialDescImg = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.descImg;
                            let _door;
                            let _doorFrontCode;
                            let _doorLocation;
                            let doorPrice;
                            if (idx == 0) {
                                _door = configData.modelConfig[1].typModel[j].door.door1;
                            } else if (idx == 1) {
                                _door = configData.modelConfig[1].typModel[j].door.door2;
                            } else if (idx == 2) {
                                _door = configData.modelConfig[1].typModel[j].door.door3;
                            } else if (idx == 3) {
                                _door = configData.modelConfig[1].typModel[j].door.door4;
                            }
                            doorPrice = _door.defaultPrice;
                            _doorLocation = _door.name;
                            _doorFrontCode = _door.code;
                            modalTitle.push(doorMaterialName);
                            modalTitle2.push(doorMaterialEnName);
                            modalTxt.push(doorMaterialDesc);
                            modalImg.push(doorMaterialDescImg);
                            colorSelBodyHtml += '<div class="swiper-slide">';
                            colorSelBodyHtml += '   <dl>';
                            colorSelBodyHtml += '       <dt>' + doorMaterialName + '</dt>';
                            colorSelBodyHtml += '       <dd>';
                            colorSelBodyHtml += '           <ul>';
                            for (let l = 0; l < doorColorLeng; l++) {
                                let doorColorName = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.doorColor[l].name;
                                let doorColorCode = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.doorColor[l].code;
                                let doorColorMixingCode = configData.modelConfig[1].typModel[j].doorColorData[k].doorMaterial.doorColor[l].mixingCode;
                                let colorImgUrl = '/lg5-common/images/OBJ/experience/color/';
                                let colorImgName = 'color_' + doorMaterialCode + '_' + doorColorCode + '.png';
                                let colorHtml = '<li>';
                                colorHtml += '  <button type="button" data-door-code="' + _doorFrontCode + '" data-door-klocation="' + _doorLocation + '" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" data-door-price="' + doorPrice + '" class="btn_door_color_sel">';
                                colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                                //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (소재명 제거)
                                // colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>'; 
                                colorHtml += '      <span class="color_name">' + doorColorName + '</span>';
                                colorHtml += '  </button>';
                                colorHtml += '</li>';
                                colorSelBodyHtml += colorHtml;
                            }
                            colorSelBodyHtml += '           <ul>';
                            colorSelBodyHtml += '       </dd>';
                            colorSelBodyHtml += '   </dl>';
                            colorSelBodyHtml += '</div>';
                        }
                        $(".color_sel_wrap").addClass("is_active");
                        $(".simul_step2 .etc_area").addClass("is_active");
                        $(".color_sel_wrap .color_sel_body .swiper-wrapper").html(colorSelBodyHtml);
                        setTimeout(function() {
                            slideWrapAutoSize(".color_sel_wrap .color_sel_body");
                        }, 10);

                    }
                }
            } else if (modelCate == "refrigerator_convertible") {
                let typModelLeng = configData.modelConfig[2].typModel.length;
                //doorPrice = door.defaultPrice;
                for (let j = 0; j < typModelLeng; j++) {
                    if (configData.modelConfig[2].typModel[j].defaultCode == modelCode) {
                        let doorMaterialLeng = configData.modelConfig[2].typModel[j].doorColorData.length;
                        let colorSelBodyHtml = '';
                        for (let k = 0; k < doorMaterialLeng; k++) {
                            let doorColorLeng = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.doorColor.length;
                            let doorMaterialName = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.name;
                            let doorMaterialEnName = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.enName;
                            let doorMaterialCode = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.code;
                            let doorMaterialDesc = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.desc;
                            let doorMaterialDescImg = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.descImg;
                            let _door;
                            let _doorFrontCode;
                            let _doorLocation;
                            let doorPrice;
                            if (idx == 0) {
                                _door = configData.modelConfig[2].typModel[j].door.door1;
                            } else if (idx == 1) {
                                _door = configData.modelConfig[2].typModel[j].door.door2;
                            } else if (idx == 2) {
                                _door = configData.modelConfig[2].typModel[j].door.door3;
                            } else if (idx == 3) {
                                _door = configData.modelConfig[2].typModel[j].door.door4;
                            }
                            doorPrice = _door.defaultPrice;
                            _doorLocation = _door.name;
                            _doorFrontCode = _door.code;
                            modalTitle.push(doorMaterialName);
                            modalTitle2.push(doorMaterialEnName);
                            modalTxt.push(doorMaterialDesc);
                            modalImg.push(doorMaterialDescImg);
                            colorSelBodyHtml += '<div class="swiper-slide">';
                            colorSelBodyHtml += '   <dl>';
                            colorSelBodyHtml += '       <dt>' + doorMaterialName + '</dt>';
                            colorSelBodyHtml += '       <dd>';
                            colorSelBodyHtml += '           <ul>';
                            for (let l = 0; l < doorColorLeng; l++) {
                                let doorColorName = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.doorColor[l].name;
                                let doorColorCode = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.doorColor[l].code;
                                let doorColorMixingCode = configData.modelConfig[2].typModel[j].doorColorData[k].doorMaterial.doorColor[l].mixingCode;
                                let colorImgUrl = '/lg5-common/images/OBJ/experience/color/';
                                let colorImgName = 'color_' + doorMaterialCode + '_' + doorColorCode + '.png';
                                let colorHtml = '<li>';
                                colorHtml += '  <button type="button" data-door-code="' + _doorFrontCode + '" data-door-klocation="' + _doorLocation + '" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" data-door-price="' + doorPrice + '" class="btn_door_color_sel">';
                                colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                                //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (소재명 제거)
                                // colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>'; 
                                colorHtml += '      <span class="color_name">' + doorColorName + '</span>';
                                colorHtml += '  </button>';
                                colorHtml += '</li>';
                                colorSelBodyHtml += colorHtml;
                            }
                            colorSelBodyHtml += '           <ul>';
                            colorSelBodyHtml += '       </dd>';
                            colorSelBodyHtml += '   </dl>';
                            colorSelBodyHtml += '</div>';
                        }
                        $(".color_sel_wrap").addClass("is_active");
                        $(".simul_step2 .etc_area").addClass("is_active");
                        $(".color_sel_wrap .color_sel_body .swiper-wrapper").html(colorSelBodyHtml);
                        setTimeout(function() {
                            slideWrapAutoSize(".color_sel_wrap .color_sel_body");
                        }, 10);

                    }
                }
            }
            $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
            $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
            setTimeout(function() {
                $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
            }, 100);


            var modalHtml = '';
            for (let i = 0; i < modalTitle.length; i++) {
                modalHtml += '<div class="swiper-slide">';
                modalHtml += '  <dl>';
                modalHtml += '      <dt>' + modalTitle2[i] + ' (' + modalTitle[i] + ')</dt>';
                modalHtml += '      <dd>';
                modalHtml += '          <p>' + modalTxt[i] + '</p>';
                modalHtml += '          <span><img src="' + modalImg[i] + '" alt="" /></span>';
                modalHtml += '      </dd>';
                modalHtml += '  </dl>';
                modalHtml += '</div>';
                //materiaModal.removeSlide(i);

                $(".obj_tooltip_wrap .material_modal .swiper-wrapper").html(modalHtml);

                setTimeout(function() {
                    $(".color_sel_wrap .swiper-wrapper").css("transform", pickerPosition);
                }, 200);


            }
            //
            //$(".simul_step2 .material_modal")
        },
        //비교제품 노출
        stepThree: function() {
            let modelCate1 = $(".model_set_wrap[data-model-editing='Y']").attr("data-model-cate");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let tblHtml = '';
            let modelPriceArry = [];
            let $objContent = $('.model_experience'); //210719 BTOCSITE-2346 추가
            if (modelCate1 == "refrigerator1" || modelCate1 == "refrigerator2") {
                let refrigeratorType = configData.modelConfig[0].refrigeratorType;
                for (let i = 0; i < refrigeratorType.length; i++) {
                    if (refrigeratorType[i].typ == modelCate2) {
                        let _typModel = refrigeratorType[i].typModel;
                        for (let j = 0; j < _typModel.length; j++) {
                            if (_typModel[j].defaultCode == modelCode) {
                                let mainMagicSpace = _typModel[j].magicSpace;
                                let mainEnergy = _typModel[j].energy;
                                let mainKnockOn = _typModel[j].knockOn;
                                let mainVoiceChk = _typModel[j].voiceChk; //210719 BTOCSITE-2346 음성인식 변수 추가
                                let mainPrice = _typModel[j].defaultPrice;
                                tblHtml += '<div class="tb_row tb_compare" style="visibility:hidden">';
                                tblHtml += '    <table>';
                                tblHtml += '        <caption>기능과 가격을 비교하여 모델 안내</caption>';
                                tblHtml += '        <colgroup>';
                                tblHtml += '            <col style="width:30.5%">';
                                // S - 210719 BTOCSITE-2346 음성인식 컬럼 추가
                                if(mainVoiceChk != undefined && mainVoiceChk != ""){
                                tblHtml += '            <col style="width:13%">';
                                }
                                // E - 210719 BTOCSITE-2346 음성인식 컬럼 추가
                                tblHtml += '            <col style="width:16%">';
                                tblHtml += '            <col style="width:16%">';
                                // S - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                if ($objContent.attr('data-page-type') === 'COMMON'){
                                tblHtml += '            <col style="width:24.5%">';
                                }
                                // E - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                tblHtml += '        </colgroup>';
                                tblHtml += '        <thead>';
                                tblHtml += '            <tr>';
                                tblHtml += '                <th scope="col">모델명</th>';
                                // S - 210719 BTOCSITE-2346 음성인식 컬럼 추가
                                if(mainVoiceChk != undefined && mainVoiceChk != ""){
                                    tblHtml += '            <th scope="col">음성인식</th>';
                                }
                                // E - 210719 BTOCSITE-2346 음성인식 컬럼 추가
                                tblHtml += '                <th scope="col">매직스페이스</th>';
                                tblHtml += '                <th scope="col">에너지 효율</th>';
                                // S - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                if ($objContent.attr('data-page-type') === 'COMMON'){
                                tblHtml += '                <th scope="col">가격</th>';
                                }
                                // E - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                tblHtml += '            </tr>';
                                tblHtml += '        </thead>';
                                tblHtml += '        <tbody>';

                                modelPriceArry.push(modelCode);
                                tblHtml += '<tr class="is_active">';
                                tblHtml += '    <td><span>' + modelCode + '</span></td>';
                                if(mainVoiceChk != undefined && mainVoiceChk != ""){
                                tblHtml += '    <td>' + mainVoiceChk + '</td>';
                                }
                                tblHtml += '    <td>' + mainMagicSpace + '개</td>';
                                //S - 210722 BTOCSITE-2346 에너지 효율 등급 text-align:center로 수정(newbest, himart)
                                if ($objContent.attr('data-page-type') === 'COMMON'){
                                tblHtml += '    <td>' + mainEnergy + '등급</td>';
                                } else {
                                tblHtml += '    <td style="text-align:center;">' + mainEnergy + '등급</td>';
                                }
                                //E - 210722 BTOCSITE-2346 에너지 효율 등급 text-align:center로 수정(newbest, himart)
                                // S - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                if ($objContent.attr('data-page-type') === 'COMMON'){
                                tblHtml += '    <td><span></span>원</td>';
                                }
                                // E - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                tblHtml += '</tr>';
                                if (_typModel[j].subModel != undefined && _typModel[j].subModel != "") {
                                    let _subModel = _typModel[j].subModel;
                                    for (let k = 0; k < _subModel.length; k++) {
                                        let subCode = _subModel[k].modelCode;
                                        let subMagicSpace = _subModel[k].magicSpace;
                                        let subEnergy = _subModel[k].energy;
                                        let subVoiceChk = _subModel[k].voiceChk
                                        let subKnockOn = _subModel[k].knockOn;
                                        let subPrice = _subModel[k].defaultPrice;
                                        modelPriceArry.push(subCode);
                                        tblHtml += '<tr>';
                                        tblHtml += '    <td><span>' + subCode + '</span></td>';
                                        if(subVoiceChk != undefined && subVoiceChk != ""){
                                            tblHtml += '    <td>' + subVoiceChk + '</td>';
                                        }
                                        tblHtml += '    <td>' + subMagicSpace + '개</td>';
                                        //S - 210722 BTOCSITE-2346 에너지 효율 등급 text-align:center로 수정(newbest, himart)
                                        if ($objContent.attr('data-page-type') === 'COMMON'){
                                        tblHtml += '    <td>' + subEnergy + '등급</td>';
                                        } else {
                                        tblHtml += '    <td style="text-align:center;">' + subEnergy + '등급</td>';
                                        }
                                        //E - 210722 BTOCSITE-2346 에너지 효율 등급 text-align:center로 수정(newbest, himart)
                                        // S - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                        if ($objContent.attr('data-page-type') === 'COMMON'){
                                        tblHtml += '    <td><span></span>원</td>';
                                        }
                                        // E - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                        tblHtml += '</tr>';
                                    }
                                }
                                tblHtml += '        </tbody>';
                                tblHtml += '    </table>';
                                tblHtml += '</div>';
                            }
                        }
                    }
                }
            } else if (modelCate1 == "refrigerator_kimchi") {
                let _typModel = configData.modelConfig[1].typModel;
                for (let i = 0; i < _typModel.length; i++) {
                    if (_typModel[i].defaultCode == modelCode) {
                        let mainPrice = _typModel[i].defaultPrice;
                        modelPriceArry.push(modelCode);
                        tblHtml += '<div class="tb_row tb_compare" style="visibility:hidden">';
                        tblHtml += '    <table>';
                        tblHtml += '        <caption>기능과 가격을 비교하여 모델 안내</caption>';
                        tblHtml += '        <colgroup>';
                        tblHtml += '            <col style="width:50%">';
                        tblHtml += '            <col style="width:50%">';
                        tblHtml += '        </colgroup>';
                        tblHtml += '        <thead>';
                        tblHtml += '            <tr>';
                        tblHtml += '                <th scope="col">모델명</th>';
                        tblHtml += '                <th scope="col">가격</th>';
                        tblHtml += '            </tr>';
                        tblHtml += '        </thead>';
                        tblHtml += '        <tbody>';
                        // S - 210722 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 "-" 표시)
                        if ($objContent.attr('data-page-type') === 'COMMON'){
                        tblHtml += '<tr class="is_active">';
                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                        tblHtml += '    <td><span></span>원</td>';
                        tblHtml += '</tr>';
                        } else if($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART'  || $objContent.attr('data-page-type') === 'ETLAND') { //210805 BTOCSITE-3487
                        tblHtml += '<tr class="is_active">';
                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                        tblHtml += '    <td style="text-align:center;">-</td>';
                        tblHtml += '</tr>';
                        }
                        // E - 210722 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 "-" 표시)
                        if (_typModel[i].subModel != undefined && _typModel[i].subModel != "") {
                            let _subModel = _typModel[i].subModel;
                            for (let k = 0; k < _subModel.length; k++) {
                                let subCode = _subModel[k].modelCode;
                                let subPrice = _subModel[k].defaultPrice;
                                modelPriceArry.push(subCode);
                                tblHtml += '<tr>';
                                tblHtml += '    <td><span>' + subCode + '</span></td>';
                                // S - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                if ($objContent.attr('data-page-type') === 'COMMON'){
                                tblHtml += '    <td><span></span>원</td>';
                                } else if($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART'  || $objContent.attr('data-page-type') === 'ETLAND') { //210805 BTOCSITE-3487
                                tblHtml += '    <td style="text-align:center;">-</td>';
                                }
                                // E - 210719 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 미노출)
                                tblHtml += '</tr>';
                            }
                        }
                        tblHtml += '        </tbody>';
                        tblHtml += '    </table>';
                        tblHtml += '</div>';
                    }
                }
            } else if (modelCate1 == "refrigerator_convertible") {
                let _typModel = configData.modelConfig[2].typModel;
                for (let i = 0; i < _typModel.length; i++) {
                    if (_typModel[i].defaultCode == modelCode) {
                        let mainPrice = _typModel[i].defaultPrice;
                        modelPriceArry.push(modelCode);
                        tblHtml += '<div class="tb_row tb_compare" style="visibility:hidden">';
                        tblHtml += '    <table>';
                        tblHtml += '        <caption>기능과 가격을 비교하여 모델 안내</caption>';
                        tblHtml += '        <colgroup>';
                        tblHtml += '            <col style="width:50%">';
                        tblHtml += '            <col style="width:50%">';
                        tblHtml += '        </colgroup>';
                        tblHtml += '        <thead>';
                        tblHtml += '            <tr>';
                        tblHtml += '                <th scope="col">모델명</th>';
                        tblHtml += '                <th scope="col">가격</th>';
                        tblHtml += '            </tr>';
                        tblHtml += '        </thead>';
                        tblHtml += '        <tbody>';
                        // S - 210722 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 "-" 표시)
                        if ($objContent.attr('data-page-type') === 'COMMON'){
                        tblHtml += '<tr class="is_active">';
                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                        tblHtml += '    <td><span></span>원</td>';
                        tblHtml += '</tr>';
                        } else if($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART'  || $objContent.attr('data-page-type') === 'ETLAND') { //210805 BTOCSITE-3487
                        tblHtml += '<tr class="is_active">';
                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                        tblHtml += '    <td style="text-align:center;">-</td>';
                        tblHtml += '</tr>';
                        }
                        // E - 210722 BTOCSITE-2346 data-page-type == "common" 일때만 가격 노출되도록 수정(newbest,himart에선 "-" 표시)
                        tblHtml += '        </tbody>';
                        tblHtml += '    </table>';
                        tblHtml += '</div>';
                    }
                }
            }
            resultModelPriceCheck(modelPriceArry); //개발쪽에 가격 산출을 위한 모델코드를 넘김 //함수로 반환받아야 함
            /* BTOCSITE-1582 */
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                //return;
                
            }
            /* //BTOCSITE-1582 */

            //S - 210726 BTOCSITE-2346 구매하기 버튼 클릭 후, data값 없을때 가격비교하기 영역(step3) 없어지는 결함 존재하여 값있을때만 tblHtml 그리도록 변경
            if(tblHtml != undefined && tblHtml != ""){
            $(".compare_sel_model_area").addClass("is_active").html(tblHtml);
            }
            //E - 210726 BTOCSITE-2346 구매하기 버튼 클릭 후, data값 없을때 가격비교하기 영역(step3) 없어지는 결함 존재하여 값있을때만 tblHtml 그리도록 변경
            $(".simul_step3 .etc_area").addClass("is_active");
            $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
            
            
        },
        //견적확인하기
        priceCheck: function(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo) {
            // console.log("idx", idx);
            // console.log("modelTyp", modelCate);
            // console.log("defaultModel", defaultModel);
            // console.log("doorInfo", doorInfo);
            let pannelType = 'normal'; // BTOCSITE-3198 pannelType 파라미터 추가 211020
            let priceHtml = '';
            let sumPrice = 0;
            let priceArry = [];
            let domain = location.host.indexOf('wwwdev50') !== -1 ? location.protocol+'//wwwstg.lge.co.kr' : location.protocol+'//'+location.host; // 패널 교체 배너 url 개발 서버에 없어서 스테이지 url로 변경
            
            priceArry.push(defaultModel);                            
            
            priceHtml += '<div class="swiper-slide">';
            priceHtml += '  <dl data-cate="' + modelCate + '" data-default-code="' + defaultModel + '" data-default-price="' + defaultPrice + '">';
            priceHtml += '      <dt>' + modelName + '</dt>';
            priceHtml += '      <div class="panel_guide">';
            priceHtml += '          <p class="strong" >패널만 교체 가능한 거 아세요?</p>';
            priceHtml += '          <p class="desc" >소재/컬러 체험해보시고 패널만 따로 신청해 주세요. <a class="more btn-link" data-go-url data-open-mode="inAppBrowser" data-target="_blank" data-href="'+domain+'/story/user-guide/objetcollection-change-panel-guide"><u>자세히 보기</u></a></p>';   
            priceHtml += '      </div>';
            priceHtml += '      <dd>';
            priceHtml += '          <div class="price_info">';
            priceHtml += '              <ul class="product_list">';
            priceHtml += '                  <li data-default-code="' + defaultModel + '">';
            priceHtml += '                      <span class="product_name">' + defaultModel + '</span>';
            priceHtml += '                      <span class="product_price"><em></em>원</span>';
            priceHtml += '                  </li>';
            sumPrice += parseInt(minusComma(defaultPrice));
            // if ($(".model_set_wrap[data-model-editing='Y']").attr("data-best") != "Y") {
                for (let i = 0; i < doorInfo.length; i++) {
                    let doorModelCode = doorInfo[i][5] + '-' + doorInfo[i][2] + doorInfo[i][3];
                    if (doorModelCode == "B320TT-SMT") {
                        doorModelCode = "B320TT-SMT";
                    }
                    priceArry.push(doorModelCode);
                    priceHtml += '                  <li data-default-code="' + doorModelCode + '">';

                    var _klocation = doorInfo[i][7]!=undefined ? doorInfo[i][7]: "";

                    priceHtml += '                      <span class="product_name">' + doorInfo[i][6] + ' ' + _klocation + '</span>';
                    priceHtml += '                      <span class="product_price"><em></em>원</span>';
                    priceHtml += '                  </li>';
                    sumPrice += parseInt(minusComma(doorInfo[i][4]));
                }
            // }

            sumPrice = addComma(sumPrice);
            priceHtml += '                                        <li class="sum">';
            priceHtml += '                                            <span class="product_name">총 할인 적용가</span>';
            priceHtml += '                                            <span class="product_price"><span class="before_price"><em></em>원</span><span class="after_price"><em></em>원</span></span>';
            priceHtml += '                                        </li>';
            priceHtml += '                                    </ul>';
            priceHtml += '                                    <button class="btn btn_purchase"><span>구매하기</span></button>';
            priceHtml += '                                    <p class="err-msg">할인적용가는 회원에게 적용되는 가격이며 로그인하여 주문시에 적용됩니다.</p>';
            priceHtml += '                                </div>';
            priceHtml += '                            </dd>';
            priceHtml += '                        </dl>';
            priceHtml += '                    </div>';
            let sumSlide = $(".total_price_info_body .swiper-wrapper .swiper-slide");
            //console.log('idx', idx);
            //console.log('sumSlide.length', sumSlide.length);
            /* BTOCSITE-1582 */
            var $objContent = $('.model_experience');
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                //priceHtml = '<div class="swiper-slide"><dl><dd style="background:#fff;"><div class="price_info"><button class="btn btn_purchase"><span>구매하기</span></button></div></dd></dl></div>';
                //priceSumList.appendSlide(priceHtml);
                //console.log('priceSumList', priceSumList);
                $(priceSumList.$el[0]).hide();
            }
            /* //BTOCSITE-1582 */

            if (sumSlide.length > 0) {
                if (sumSlide.length > idx) {
                    priceSumList.removeSlide(idx);
                    priceSumList.addSlide(idx, priceHtml);
                } else {
                    priceSumList.appendSlide(priceHtml);
                }
            } else {
                priceSumList.appendSlide(priceHtml);
            }
            
            $(".total_price_info_wrap").attr("data-sum-active", "Y");
            setTimeout(function() {
                $(".total_price_info_wrap").addClass("is_active");
            }, 100);
            resultDoorPriceCheck(idx, priceArry, pannelType); // BTOCSITE-3198 pannelType 파라미터 추가 211020
            //토탈 sum가격 구하기
            setTimeout(function() {
                let totalSumPrice = 0;
                $(".total_price_info_body .swiper-wrapper .swiper-slide").each(function() {
                    totalSumPrice += parseInt(minusComma($(this).find(".sum .product_price em").text()));
                });
                $(".total_result_price .price em").text(addComma(totalSumPrice));
            }, 100);

        },
        //BTOCSITE-3198 패널용 가격 체크
        pannelCheck: function(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo) {
            // console.log("idx", idx);
            // console.log("modelTyp", modelCate);
            // console.log("defaultModel", defaultModel);
            // console.log("doorInfo", doorInfo);
            let pannelType = 'pannel'; // BTOCSITE-3198 pannelType 파라미터 추가 211020
            let priceHtml = '';
            let sumPrice = 0;
            let priceArry = [];
            //let domain = location.host.indexOf('wwwdev50') !== -1 ? location.protocol+'//wwwstg.lge.co.kr' : location.protocol+'//'+location.host; // 패널 교체 배너 url 개발 서버에 없어서 스테이지 url로 변경
            
            priceArry.push(defaultModel);                            
            
            priceHtml += '<div class="swiper-slide">';
            priceHtml += '  <dl data-cate="' + modelCate + '" data-default-code="' + defaultModel + '" data-default-price="' + defaultPrice + '">';
            priceHtml += '      <div class="pannel_info">';
            priceHtml += '          <dt>' + modelName + '</dt>';
            priceHtml += '          <button class="btn border btn_total"><span>선택 제품 총 금액 확인</span></button>';
            priceHtml += '      </div>';
            priceHtml += '      <dd>';
            priceHtml += '          <div class="price_info">';
            priceHtml += '              <ul class="product_list pannel_list">'; // 21-10-12 pannel_list 클래스 추가 - BTOCSITE-3198
            //sumPrice += parseInt(minusComma(defaultPrice)); 21-10-12 Default Model 가격 제거
            // if ($(".model_set_wrap[data-model-editing='Y']").attr("data-best") != "Y") {
                for (let i = 0; i < doorInfo.length; i++) {
                    let doorModelCode = doorInfo[i][5] + '-' + doorInfo[i][2] + doorInfo[i][3];
                    // if (doorModelCode == "B320TT-SMT") {
                    //     doorModelCode = "B320TT-SMT";
                    // }
                    priceArry.push(doorModelCode);
                    priceHtml += '                  <li data-default-code="' + doorModelCode + '" >';
                    var _klocation = doorInfo[i][7]!=undefined ? doorInfo[i][7]: "";
                    priceHtml += '                      <span class="product_name">' + doorInfo[i][6] + ' ' + _klocation + '</span>';
                    priceHtml += '                      <span class="product_price"><em></em>원</span>';
                    priceHtml += '                  </li>';
                    sumPrice += parseInt(minusComma(doorInfo[i][4]));
                }
            // }

            sumPrice = addComma(sumPrice);
            priceHtml += '                                    </ul>';
            priceHtml += '                                    <div class="sum">';
            priceHtml += '                                         <span class="product_total_title">총금액</span>'
            priceHtml += '                                         <span class="product_price"><span class="total_price"><em></em>원</span></span>';
            priceHtml += '                                    </div>';
            priceHtml += '                                    <button class="btn btn_purchase"><span>구매하기</span></button>';
            priceHtml += '                                </div>';
            priceHtml += '                            </dd>';
            priceHtml += '                        </dl>';
            priceHtml += '                    </div>';
            let sumSlide = $(".total_price_info_body .swiper-wrapper .swiper-slide");
            //console.log('idx', idx);
            //console.log('sumSlide.length', sumSlide.length);
            /* BTOCSITE-1582 */
            var $objContent = $('.model_experience');
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                //priceHtml = '<div class="swiper-slide"><dl><dd style="background:#fff;"><div class="price_info"><button class="btn btn_purchase"><span>구매하기</span></button></div></dd></dl></div>';
                //priceSumList.appendSlide(priceHtml);
                //console.log('priceSumList', priceSumList);
                $(priceSumList.$el[0]).hide();
            }
            /* //BTOCSITE-1582 */            

            if (sumSlide.length > 0) {
                if (sumSlide.length > idx) {
                    priceSumList.removeSlide(idx);
                    priceSumList.addSlide(idx, priceHtml);
                } else {
                    priceSumList.appendSlide(priceHtml);
                }
            } else {
                priceSumList.appendSlide(priceHtml);
            }
            
            $(".total_price_info_wrap").attr("data-sum-active", "Y");
            setTimeout(function() {
                $(".total_price_info_wrap").addClass("is_active");
            }, 100);
            resultDoorPriceCheck(idx, priceArry, pannelType); // BTOCSITE-3198 pannelType 파라미터 추가 211020
            //토탈 sum가격 구하기
            // setTimeout(function() {
            //     let totalSumPrice = 0;
            //     $(".total_price_info_body .swiper-wrapper .swiper-slide").each(function() {
            //         totalSumPrice += parseInt(minusComma($(this).find(".sum .product_price .total_price em").text()));
            //     });
            //     $(".total_result_price .price em").text(addComma(totalSumPrice));
            // }, 100);

        },        


        //추천제품 출력
        openProposeModel: function(modelCode, modelcate) {
            let _thisModel = [];
            for (let i = 0; i < proposeSet.proposeConfig.length; i++) {
                if (modelCode == proposeSet.proposeConfig[i].defaultCode) {
                    _thisModel.push(proposeSet.proposeConfig[i]);
                }
            }
            let _bestModel = [];
            for (let i = 0; i < bestSeller.bestConfig.length; i++) {
                if (modelCode == bestSeller.bestConfig[i].defaultCode) {
                    _bestModel.push(bestSeller.bestConfig[i]);
                }
            }
            let contFHtml = '';
            let contSHtml = '';
            let contMHtml = '';
            let contGHtml = '';
            let contHtml = '';
            let contFHtml2 = '';
            let contSHtml2 = '';
            let contMHtml2 = '';
            let contGHtml2 = '';
            let contHtml2 = '';
            if (_thisModel.length > 0 || _bestModel.length > 0) {
                if (_thisModel.length > 0) {
                    let imgCate;

                    let imgCate2;
                    if (modelcate == "refrigerator1" || modelcate == "refrigerator2") {
                        imgCate = "rf";
                        imgCate2 = "refrigerator";
                    } else if (modelcate == "refrigerator_kimchi") {
                        imgCate = "rf_kim";
                        imgCate2 = "refrigerator_kimchi";
                    } else if (modelcate == "refrigerator_convertible") {
                        imgCate = "rf_con";
                        imgCate2 = "refrigerator_convertible";
                    }
                    let imgDefaultUrl = "/lg5-common/images/OBJ/experience/" + imgCate2 + "/";
                    contFHtml = '';
                    contFHtml += '<div class="swiper-slide">';
                    contFHtml += '   <dl>';
                    contFHtml += '       <dt>페닉스</dt>';
                    contFHtml += '       <dd>';
                    contFHtml += '           <ul>';
                    contSHtml = '';
                    contSHtml += '<div class="swiper-slide">';
                    contSHtml += '   <dl>';
                    contSHtml += '       <dt>솔리드</dt>';
                    contSHtml += '       <dd>';
                    contSHtml += '           <ul>';
                    contMHtml = '';
                    contMHtml += '<div class="swiper-slide">';
                    contMHtml += '   <dl>';
                    contMHtml += '       <dt>네이쳐</dt>';
                    contMHtml += '       <dd>';
                    contMHtml += '           <ul>';
                    contGHtml = '';
                    contGHtml += '<div class="swiper-slide">';
                    contGHtml += '   <dl>';
                    contGHtml += '       <dt>미스트</dt>';
                    contGHtml += '       <dd>';
                    contGHtml += '           <ul>';
                    for (let i = 0; i < _thisModel.length; i++) {
                        let _modelDefaultCode = _thisModel[i].defaultCode;
                        let _modelCode = _thisModel[i].modelCode;

                        let _doorCode1 = _thisModel[i].door1;
                        let _doorCode2 = _thisModel[i].door2;
                        let _doorCode3 = _thisModel[i].door3;
                        let _doorCode4 = _thisModel[i].door4;
                        let _doorInfo1 = _doorCode1.slice(-3);
                        let _doorInfo2 = _doorCode2.slice(-3);
                        let _doorInfo3 = _doorCode3.slice(-3);
                        let _doorInfo4 = _doorCode4.slice(-3);
                        let _doorFrontInfo1 = _doorCode1.split('-');
                        let _doorFrontInfo2 = _doorCode2.split('-');
                        let _doorFrontInfo3 = _doorCode3.split('-');
                        let _doorFrontInfo4 = _doorCode4.split('-');
                        let _doorInfoMaterial = [];
                        let _doorInfoColor = [];
                        let _doorInfoLocation = [];
                        let _doorFrontInfo = [];
                        let _doorInfoKMaterial = [];
                        let _doorInfoKColor = [];
                        _doorInfoMaterial.push(_doorInfo1.substring(0, 1));
                        _doorInfoColor.push(_doorInfo1.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo2.substring(0, 1));
                        _doorInfoColor.push(_doorInfo2.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo3.substring(0, 1));
                        _doorInfoColor.push(_doorInfo3.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo4.substring(0, 1));
                        _doorInfoColor.push(_doorInfo4.substring(1, 3));
                        _doorInfoLocation.push(_doorCode1.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode2.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode3.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode4.slice(-6, -4));
                        _doorFrontInfo.push(_doorFrontInfo1[0]);
                        _doorFrontInfo.push(_doorFrontInfo2[0]);
                        _doorFrontInfo.push(_doorFrontInfo3[0]);
                        _doorFrontInfo.push(_doorFrontInfo4[0]);

                        
                        for (let j = 0; j < _doorInfoMaterial.length; j++) {
                            if (_doorInfoMaterial[j] == "F") {
                                _doorInfoKMaterial[j] = "페닉스"
                            } else if (_doorInfoMaterial[j] == "S") {
                                _doorInfoKMaterial[j] = "솔리드"
                            } else if (_doorInfoMaterial[j] == "M") {
                                _doorInfoKMaterial[j] = "네이쳐"
                            } else if (_doorInfoMaterial[j] == "G") {
                                _doorInfoKMaterial[j] = "미스트"
                            }
                        }
                        for (let j = 0; j < _doorInfoColor.length; j++) {
                            if (_doorInfoColor[j] == "BT") {
                                _doorInfoKColor[j] = "보타닉"
                            } else if (_doorInfoColor[j] == "SD") {
                                _doorInfoKColor[j] = "샌드"
                            } else if (_doorInfoColor[j] == "ST") {
                                _doorInfoKColor[j] = "스톤"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "GR") {
                                _doorInfoKColor[j] = "그린"
                            } else if (_doorInfoColor[j] == "MT") {
                                _doorInfoKColor[j] = "맨해튼 미드나잇"
                            } else if (_doorInfoColor[j] == "BE") {
                                _doorInfoKColor[j] = "베이지"
                            } else if (_doorInfoColor[j] == "MN") {
                                _doorInfoKColor[j] = "민트"
                            } else if (_doorInfoColor[j] == "PK") {
                                _doorInfoKColor[j] = "핑크"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "WH") {
                                _doorInfoKColor[j] = "화이트"
                            } else if (_doorInfoColor[j] == "GY") {
                                _doorInfoKColor[j] = "그레이"
                            } else if (_doorInfoColor[j] == "BK") {
                                _doorInfoKColor[j] = "블랙"
                            } else if (_doorInfoColor[j] == "RD") {
                                _doorInfoKColor[j] = "레드우드"
                            } else if (_doorInfoColor[j] == "CL") {
                                _doorInfoKColor[j] = "클레이 브라운"
                            }
                            //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (레드우드,클레이브라운 컬러코드 추가)
                        }

                        if (_doorInfoMaterial[0] == "F") {
                            contFHtml2 += '<li>';
                            contFHtml2 += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '" data-model-code="' + _modelCode + '"  class="btn_propose_model_sel">';
                            contFHtml2 += '      <div class="mini_model_wrap">';
                            for (let j = 0; j < _doorInfoMaterial.length; j++) {
                                if (_doorInfoMaterial[j] != "") {
                                    contFHtml2 += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                                }
                            }
                            contFHtml2 += '      </div>';
                            contFHtml2 += '      <span>' + _modelCode + '</span>';
                            contFHtml2 += '  </button>';
                            contFHtml2 += '</li>';
                        } else if (_doorInfoMaterial[0] == "S") {
                            contSHtml2 += '<li>';
                            contSHtml2 += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '" data-model-code="' + _modelCode + '"  class="btn_propose_model_sel">';
                            contSHtml2 += '      <div class="mini_model_wrap">';
                            for (let j = 0; j < _doorInfoMaterial.length; j++) {
                                if (_doorInfoMaterial[j] != "") {
                                    contSHtml2 += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                                }
                            }
                            contSHtml2 += '      </div>';
                            contSHtml2 += '      <span>' + _modelCode + '</span>';
                            contSHtml2 += '  </button>';
                            contSHtml2 += '</li>';
                        } else if (_doorInfoMaterial[0] == "M") {
                            contMHtml2 += '<li>';
                            contMHtml2 += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '" data-model-code="' + _modelCode + '"  class="btn_propose_model_sel">';
                            contMHtml2 += '      <div class="mini_model_wrap">';
                            for (let j = 0; j < _doorInfoMaterial.length; j++) {
                                if (_doorInfoMaterial[j] != "") {
                                    contMHtml2 += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                                }
                            }
                            contMHtml2 += '      </div>';
                            contMHtml2 += '      <span>' + _modelCode + '</span>';
                            contMHtml2 += '  </button>';
                            contMHtml2 += '</li>';
                        } else if (_doorInfoMaterial[0] == "G") {
                            contGHtml2 += '<li>';
                            contGHtml2 += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '" data-model-code="' + _modelCode + '"  class="btn_propose_model_sel">';
                            contGHtml2 += '      <div class="mini_model_wrap">';
                            for (let j = 0; j < _doorInfoMaterial.length; j++) {
                                if (_doorInfoMaterial[j] != "") {
                                    contGHtml2 += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                                }
                            }
                            contGHtml2 += '      </div>';
                            contGHtml2 += '      <span>' + _modelCode + '</span>';
                            contGHtml2 += '  </button>';
                            contGHtml2 += '</li>';
                        }


                    }
                    if (contFHtml2 == "") {
                        contFHtml = '';
                    } else {
                        contFHtml += contFHtml2;
                        contFHtml += '           </ul>';
                        contFHtml += '       </dd>';
                        contFHtml += '   </dl>';
                        contFHtml += '</div>';
                    }
                    if (contSHtml2 == "") {
                        contSHtml = '';
                    } else {
                        contSHtml += contSHtml2;
                        contSHtml += '           </ul>';
                        contSHtml += '       </dd>';
                        contSHtml += '   </dl>';
                        contSHtml += '</div>';
                    }
                    if (contMHtml2 == "") {
                        contMHtml = '';
                    } else {
                        contMHtml += contMHtml2;
                        contMHtml += '           </ul>';
                        contMHtml += '       </dd>';
                        contMHtml += '   </dl>';
                        contMHtml += '</div>';
                    }
                    if (contGHtml2 == "") {
                        contGHtml = '';
                    } else {
                        contGHtml += contGHtml2;
                        contGHtml += '           </ul>';
                        contGHtml += '       </dd>';
                        contGHtml += '   </dl>';
                        contGHtml += '</div>';
                    }

                }
                if (_bestModel.length > 0) {
                    let imgCate;

                    let imgCate2;
                    if (modelcate == "refrigerator1" || modelcate == "refrigerator2") {
                        imgCate = "rf";
                        imgCate2 = "refrigerator";
                    } else if (modelcate == "refrigerator_kimchi") {
                        imgCate = "rf_kim";
                        imgCate2 = "refrigerator_kimchi";
                    } else if (modelcate == "refrigerator_convertible") {
                        imgCate = "rf_con";
                        imgCate2 = "refrigerator_convertible";
                    }
                    let imgDefaultUrl = "/lg5-common/images/OBJ/experience/" + imgCate2 + "/";
                    contHtml = '';
                    contHtml += '<div class="swiper-slide">';
                    contHtml += '   <dl>';
                    contHtml += '       <dt>베스트</dt>';
                    contHtml += '       <dd>';
                    contHtml += '           <ul>';

                    for (let i = 0; i < _bestModel.length; i++) {
                        let _modelDefaultCode = _bestModel[i].defaultCode;
                        let _modelCode = _bestModel[i].modelCode;

                        let _doorCode1 = _bestModel[i].door1;
                        let _doorCode2 = _bestModel[i].door2;
                        let _doorCode3 = _bestModel[i].door3;
                        let _doorCode4 = _bestModel[i].door4;
                        let _doorInfo1 = _doorCode1.slice(-3);
                        let _doorInfo2 = _doorCode2.slice(-3);
                        let _doorInfo3 = _doorCode3.slice(-3);
                        let _doorInfo4 = _doorCode4.slice(-3);
                        let _doorFrontInfo1 = _doorCode1.split('-');
                        let _doorFrontInfo2 = _doorCode2.split('-');
                        let _doorFrontInfo3 = _doorCode3.split('-');
                        let _doorFrontInfo4 = _doorCode4.split('-');
                        let _doorInfoMaterial = [];
                        let _doorInfoColor = [];
                        let _doorInfoLocation = [];
                        let _doorFrontInfo = [];
                        let _doorInfoKMaterial = [];
                        let _doorInfoKColor = [];
                        _doorInfoMaterial.push(_doorInfo1.substring(0, 1));
                        _doorInfoColor.push(_doorInfo1.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo2.substring(0, 1));
                        _doorInfoColor.push(_doorInfo2.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo3.substring(0, 1));
                        _doorInfoColor.push(_doorInfo3.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo4.substring(0, 1));
                        _doorInfoColor.push(_doorInfo4.substring(1, 3));
                        _doorInfoLocation.push(_doorCode1.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode2.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode3.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode4.slice(-6, -4));
                        _doorFrontInfo.push(_doorFrontInfo1[0]);
                        _doorFrontInfo.push(_doorFrontInfo2[0]);
                        _doorFrontInfo.push(_doorFrontInfo3[0]);
                        _doorFrontInfo.push(_doorFrontInfo4[0]);
                        for (let j = 0; j < _doorInfoMaterial.length; j++) {
                            if (_doorInfoMaterial[j] == "F") {
                                _doorInfoKMaterial[j] = "페닉스"
                            } else if (_doorInfoMaterial[j] == "S") {
                                _doorInfoKMaterial[j] = "솔리드"
                            } else if (_doorInfoMaterial[j] == "M") {
                                _doorInfoKMaterial[j] = "네이쳐"
                            } else if (_doorInfoMaterial[j] == "G") {
                                _doorInfoKMaterial[j] = "미스트"
                            }
                        }
                        for (let j = 0; j < _doorInfoColor.length; j++) {
                            if (_doorInfoColor[j] == "BT") {
                                _doorInfoKColor[j] = "보타닉"
                            } else if (_doorInfoColor[j] == "SD") {
                                _doorInfoKColor[j] = "샌드"
                            } else if (_doorInfoColor[j] == "ST") {
                                _doorInfoKColor[j] = "스톤"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "GR") {
                                _doorInfoKColor[j] = "그린"
                            } else if (_doorInfoColor[j] == "MT") {
                                _doorInfoKColor[j] = "맨해튼 미드나잇"
                            } else if (_doorInfoColor[j] == "BE") {
                                _doorInfoKColor[j] = "베이지"
                            } else if (_doorInfoColor[j] == "MN") {
                                _doorInfoKColor[j] = "민트"
                            } else if (_doorInfoColor[j] == "PK") {
                                _doorInfoKColor[j] = "핑크"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "WH") {
                                _doorInfoKColor[j] = "화이트"
                            } else if (_doorInfoColor[j] == "GY") {
                                _doorInfoKColor[j] = "그레이"
                            } else if (_doorInfoColor[j] == "BK") {
                                _doorInfoKColor[j] = "블랙"
                            } else if (_doorInfoColor[j] == "RD") {
                                _doorInfoKColor[j] = "레드우드"
                            } else if (_doorInfoColor[j] == "CL") {
                                _doorInfoKColor[j] = "클레이 브라운"
                            }
                            //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (레드우드,클레이브라운 컬러코드 추가)
                        }

                        contHtml2 += '<li>';
                        contHtml2 += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '" data-model-code="' + _modelCode + '"  class="btn_propose_model_sel">';
                        contHtml2 += '      <div class="mini_model_wrap">';
                        for (let j = 0; j < _doorInfoMaterial.length; j++) {
                            if (_doorInfoMaterial[j] != "") {
                                contHtml2 += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                            }
                        }
                        contHtml2 += '      </div>';
                        contHtml2 += '      <span>' + _modelCode + '</span>';
                        contHtml2 += '  </button>';
                        contHtml2 += '</li>';


                    }
                    if (contHtml2 == "") {
                        contHtml = '';
                    } else {
                        contHtml += contHtml2;
                        contHtml += '           </ul>';
                        contHtml += '       </dd>';
                        contHtml += '   </dl>';
                        contHtml += '</div>';
                    }

                }

                $(".color_best .color_best_body .swiper-wrapper").html(contHtml + contFHtml + contSHtml + contMHtml + contGHtml);
                $(".color_best").slideDown() //.addClass("is_active");
                setTimeout(function() {
                    slideWrapAutoSize(".color_best .color_best_body");
                }, 10);
            } else {
                $(".proposeModel").addClass("border");
                modelSimulator.closeProposeModel();
            }



        },
        //나의 오브제 출력
        openMyPickModel: function(modelCode, modelcate) {
            let _thisModel = [];
            for (let i = 0; i < myPickSet.myPickConfig.length; i++) {
                if (modelCode == myPickSet.myPickConfig[i].defaultcode) {
                    _thisModel.push(myPickSet.myPickConfig[i]);
                }
            }
            
            setTimeout(function() {
                if (_thisModel.length > 0) {
                    let imgCate;

                    let imgCate2;
                    if (modelcate == "refrigerator1" || modelcate == "refrigerator2") {
                        imgCate = "rf";
                        imgCate2 = "refrigerator";
                    } else if (modelcate == "refrigerator_kimchi") {
                        imgCate = "rf_kim";
                        imgCate2 = "refrigerator_kimchi";
                    } else if (modelcate == "refrigerator_convertible") {
                        imgCate = "rf_con";
                        imgCate2 = "refrigerator_convertible";
                    }
                    let imgDefaultUrl = "/lg5-common/images/OBJ/experience/" + imgCate2 + "/";
                    let contHtml = '';
                    contHtml += '<div class="swiper-slide">';
                    contHtml += '   <dl>';
                    contHtml += '       <dt>내가 만든 오브제컬렉션</dt>';
                    contHtml += '       <dd>';
                    contHtml += '           <ul>';

                    for (let i = 0; i < _thisModel.length; i++) {
                        let _modelDefaultCode = _thisModel[i].defaultcode;
                        let _modelCode = _thisModel[i].modelCode;

                        let _doorCode1 = _thisModel[i].door1;
                        let _doorCode2 = _thisModel[i].door2;
                        let _doorCode3 = _thisModel[i].door3;
                        let _doorCode4 = _thisModel[i].door4;
                        let _doorInfo1 = _doorCode1.slice(-3);
                        let _doorInfo2 = _doorCode2.slice(-3);
                        let _doorInfo3 = _doorCode3.slice(-3);
                        let _doorInfo4 = _doorCode4.slice(-3);
                        let _doorFrontInfo1 = _doorCode1.split('-');
                        let _doorFrontInfo2 = _doorCode2.split('-');
                        let _doorFrontInfo3 = _doorCode3.split('-');
                        let _doorFrontInfo4 = _doorCode4.split('-');
                        let _doorInfoMaterial = [];
                        let _doorInfoColor = [];
                        let _doorInfoLocation = [];
                        let _doorFrontInfo = [];
                        let _doorInfoKMaterial = [];
                        let _doorInfoKColor = [];
                        _doorInfoMaterial.push(_doorInfo1.substring(0, 1));
                        _doorInfoColor.push(_doorInfo1.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo2.substring(0, 1));
                        _doorInfoColor.push(_doorInfo2.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo3.substring(0, 1));
                        _doorInfoColor.push(_doorInfo3.substring(1, 3));
                        _doorInfoMaterial.push(_doorInfo4.substring(0, 1));
                        _doorInfoColor.push(_doorInfo4.substring(1, 3));
                        _doorInfoLocation.push(_doorCode1.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode2.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode3.slice(-6, -4));
                        _doorInfoLocation.push(_doorCode4.slice(-6, -4));
                        _doorFrontInfo.push(_doorFrontInfo1[0]);
                        _doorFrontInfo.push(_doorFrontInfo2[0]);
                        _doorFrontInfo.push(_doorFrontInfo3[0]);
                        _doorFrontInfo.push(_doorFrontInfo4[0]);
                        for (let j = 0; j < _doorInfoMaterial.length; j++) {
                            if (_doorInfoMaterial[j] == "F") {
                                _doorInfoKMaterial[j] = "페닉스"
                            } else if (_doorInfoMaterial[j] == "S") {
                                _doorInfoKMaterial[j] = "솔리드"
                            } else if (_doorInfoMaterial[j] == "M") {
                                _doorInfoKMaterial[j] = "네이쳐"
                            } else if (_doorInfoMaterial[j] == "G") {
                                _doorInfoKMaterial[j] = "미스트"
                            }
                        }
                        for (let j = 0; j < _doorInfoColor.length; j++) {
                            if (_doorInfoColor[j] == "BT") {
                                _doorInfoKColor[j] = "보타닉"
                            } else if (_doorInfoColor[j] == "SD") {
                                _doorInfoKColor[j] = "샌드"
                            } else if (_doorInfoColor[j] == "ST") {
                                _doorInfoKColor[j] = "스톤"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "GR") {
                                _doorInfoKColor[j] = "그린"
                            } else if (_doorInfoColor[j] == "MT") {
                                _doorInfoKColor[j] = "맨해튼 미드나잇"
                            } else if (_doorInfoColor[j] == "BE") {
                                _doorInfoKColor[j] = "베이지"
                            } else if (_doorInfoColor[j] == "MN") {
                                _doorInfoKColor[j] = "민트"
                            } else if (_doorInfoColor[j] == "PK") {
                                _doorInfoKColor[j] = "핑크"
                            } else if (_doorInfoColor[j] == "SV") {
                                _doorInfoKColor[j] = "실버"
                            } else if (_doorInfoColor[j] == "WH") {
                                _doorInfoKColor[j] = "화이트"
                            } else if (_doorInfoColor[j] == "GY") {
                                _doorInfoKColor[j] = "그레이"
                            } else if (_doorInfoColor[j] == "BK") {
                                _doorInfoKColor[j] = "블랙"
                            } else if (_doorInfoColor[j] == "RD") {
                                _doorInfoKColor[j] = "레드우드"
                            } else if (_doorInfoColor[j] == "CL") {
                                _doorInfoKColor[j] = "클레이 브라운"
                            }
                            //BTOCSITE-2346 오브제컬렉션 체험 제품 업데이트 요청 210709 (레드우드,클레이브라운 컬러코드 추가)
                        }

                        contHtml += '<li>';
                        contHtml += '  <button type="button" data-cate="' + imgCate2 + '" data-model-default-code="' + _modelDefaultCode + '"   class="btn_myPick_model_sel">';
                        contHtml += '      <div class="mini_model_wrap">';
                        for (let j = 0; j < _doorInfoMaterial.length; j++) {
                            if (_doorInfoMaterial[j] != "") {
                                contHtml += '      <span data-front-code="' + _doorFrontInfo[j] + '" data-material="' + _doorInfoMaterial[j] + '" data-k-materlal="' + _doorInfoKMaterial[j] + '" data-color-code="' + _doorInfoColor[j] + '" data-k-color="' + _doorInfoKColor[j] + '" data-location="' + _doorInfoLocation[j] + '" class="mini_model"><img src="' + imgDefaultUrl + imgCate + '_door_' + _doorInfoLocation[j] + '_' + _doorInfoMaterial[j] + '_' + _doorInfoColor[j] + '.png" alt="" /></span>';
                            }
                        }
                        contHtml += '      </div>';
                        contHtml += '      <span>' + _modelDefaultCode + '</span>';
                        contHtml += '  </button>';
                        contHtml += '</li>';


                    }
                    contHtml += '           </ul>';
                    contHtml += '       </dd>';
                    contHtml += '   </dl>';
                    contHtml += '</div>';

                    $(".color_my_pick .color_my_pick_body .swiper-wrapper").html(contHtml);
                } else {
                    let nodataHtml = '<div class="swiper-slide nodata"><span class="comment">나만의 조합을 만들어 저장해 보세요.</span></div>';
                    $(".color_my_pick .color_my_pick_body .swiper-wrapper").html(nodataHtml);
                }
                $(".color_my_pick").stop().slideDown() //.addClass("is_active");
                if( window.innerWidth < 768) {
                    $('html, body').stop().animate({
                        scrollTop: $('.simul_body').offset().top - $('.objetcollection-tabs').outerHeight()
                    })
                }
                setTimeout(function() {
                  slideWrapAutoSize(".color_my_pick .color_my_pick_body");
                }, 10);
            }, 10);





        },
        //추천제품 닫기
        closeProposeModel: function() {
            //$(".color_best").aremoveClass("is_active");
            $(".color_best").stop().slideUp(); //.addClass("is_active");
        },
        //나의오브제 닫기
        closeMyPickModel: function() {
            //$(".color_best").aremoveClass("is_active");
            $(".color_my_pick").stop().slideUp(); //.addClass("is_active");
        },
        //pdp에서 넘어왔을때 해당 제품 스텝2로 셋팅
        pdpProductStep: function(modelCode) {
            let _defaultModelCode;
            let _doorInfo = [];
            for (let i = 0; i < proposeSet.proposeConfig.length; i++) {
                if (modelCode == proposeSet.proposeConfig[i].modelCode) {
                    if (proposeSet.proposeConfig[i].defaultCode != "") {
                        _defaultModelCode = proposeSet.proposeConfig[i].defaultCode
                    }
                    if (proposeSet.proposeConfig[i].door1 != "") {
                        _doorInfo.push(proposeSet.proposeConfig[i].door1);
                    }
                    if (proposeSet.proposeConfig[i].door2 != "") {
                        _doorInfo.push(proposeSet.proposeConfig[i].door2);
                    }
                    if (proposeSet.proposeConfig[i].door3 != "") {
                        _doorInfo.push(proposeSet.proposeConfig[i].door3);
                    }
                    if (proposeSet.proposeConfig[i].door4 != "") {
                        _doorInfo.push(proposeSet.proposeConfig[i].door4);
                    }
                }
            }
            let _modelCate;
            let _modelMiniCate;
            let _modelCate2;
            let _leaderImg;
            let _simulImg;
            let _defaultPrice;
            let _doorPrice = [];
            let _doorKName = [];
            let _doorLocation = [];
            let _doorKLocation = [];
            let _doorMaterial = [];
            let _doorKMaterial = [];
            let _doorColor = [];
            let _doorKColor = [];
            let _doorCode = [];
            let resultFilter;
            for (let i = 0; i < _doorInfo.length; i++) {
                _doorColor.push(_doorInfo[i].slice(-2));
                _doorMaterial.push(_doorInfo[i].slice(-3, -2));
                _doorLocation.push(_doorInfo[i].slice(-6, -4));
                _doorCode.push(_doorInfo[i].split('-')[0]);
                for (let j = 0; j < _doorMaterial.length; j++) {
                    if (_doorMaterial[j] == "F") {
                        _doorKMaterial[j] = "페닉스"
                    } else if (_doorMaterial[j] == "S") {
                        _doorKMaterial[j] = "솔리드"
                    } else if (_doorMaterial[j] == "M") {
                        _doorKMaterial[j] = "미스트"
                    } else if (_doorMaterial[j] == "G") {
                        _doorKMaterial[j] = "네이쳐"
                    }
                }
                for (let j = 0; j < _doorColor.length; j++) {
                    if (_doorColor[j] == "BT") {
                        _doorKColor[j] = "보타닉"
                    } else if (_doorColor[j] == "SD") {
                        _doorKColor[j] = "샌드"
                    } else if (_doorColor[j] == "ST") {
                        _doorKColor[j] = "스톤"
                    } else if (_doorColor[j] == "SV") {
                        _doorKColor[j] = "실버"
                    } else if (_doorColor[j] == "GR") {
                        _doorKColor[j] = "그린"
                    } else if (_doorColor[j] == "MT") {
                        _doorKColor[j] = "맨해튼 미드나잇"
                    } else if (_doorColor[j] == "BE") {
                        _doorKColor[j] = "베이지"
                    } else if (_doorColor[j] == "MN") {
                        _doorKColor[j] = "민트"
                    } else if (_doorColor[j] == "PK") {
                        _doorKColor[j] = "핑크"
                    } else if (_doorColor[j] == "SV") {
                        _doorKColor[j] = "실버"
                    } else if (_doorColor[j] == "WH") {
                        _doorKColor[j] = "화이트"
                    } else if (_doorColor[j] == "GY") {
                        _doorKColor[j] = "그레이"
                    } else if (_doorColor[j] == "BK") {
                        _doorKColor[j] = "블랙"
                    }
                }
                _doorKName.push(_doorKMaterial[i] + " " + _doorKColor[i]);
            }
            if (rfModelFilter(_defaultModelCode).length > 0) {
                resultFilter = rfModelFilter(_defaultModelCode);
                let tabHeadHtml = '';
                let tabBodyHtml = '';
                let rollingTab = [];
                _modelCate = configData.modelConfig[resultFilter[0]].id;
                _modelMiniCate = "rf";
                _modelCate2 = configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typ;
                _leaderImg = configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].leaderImg;
                _simulImg = configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].simulImg;
                _defaultPrice = configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].defaultPrice;
                _count = configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.count;
                if (_count == 3) {
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door1.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door1.defaultPrice);
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door2.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door2.defaultPrice);
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door3.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door3.defaultPrice);
                } else if (_count == 4) {
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door1.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door1.defaultPrice);
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door2.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door2.defaultPrice);
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door3.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door3.defaultPrice);
                    _doorKLocation.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door4.name);
                    _doorPrice.push(configData.modelConfig[resultFilter[0]].refrigeratorType[resultFilter[1]].typModel[resultFilter[2]].door.door4.defaultPrice);
                }
                setTimeout(function() {
                    $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='" + _modelCate + "']").addClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
                }, 100);
                //$(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='" + _modelCate + "']").addClass("is_active");
                let tabLeng = configData.modelConfig[0].refrigeratorType.length;
                for (let i = 0; i < tabLeng; i++) {
                    let tabName = configData.modelConfig[0].refrigeratorType[i].typeName;
                    let tabSubLeng = configData.modelConfig[0].refrigeratorType[i].typModel.length;
                    let modelTyp = configData.modelConfig[0].refrigeratorType[i].typ;
                    rollingTab.push(tabSubLeng);
                    tabHeadHtml += '<div class="swiper-slide"><button type="button" data-model-typ="' + modelTyp + '">' + tabName + '</button></div>';
                    for (let j = 0; j < tabSubLeng; j++) {
                        tabBodyHtml += '<div class="swiper-slide" data-typ-filter="' + i + '">';
                        tabBodyHtml += '    <button type="button" data-index="' + j + '" data-name="' + configData.modelConfig[0].refrigeratorType[i].typModel[j].name + '" data-lead-name="' + configData.modelConfig[0].id + '" data-model-typ="' + modelTyp + '" data-default-code="' + configData.modelConfig[0].refrigeratorType[i].typModel[j].defaultCode + '" class="btn_model_sub_pick">';
                        tabBodyHtml += '        <span class="pic"><img src="' + configData.modelConfig[0].refrigeratorType[i].typModel[j].leaderImg + '" alt=""/></span>';
                        tabBodyHtml += '        <span class="model_name">' + configData.modelConfig[0].refrigeratorType[i].typModel[j].name + '</span>';
                        tabBodyHtml += '    </button>';
                        tabBodyHtml += '</div>';
                    }
                }
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head").addClass("is_active");
                $(".model_choice_area .model_sub_tab_wrap").addClass("is_active");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont").addClass("is_active");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper").html(tabHeadHtml);
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper").html(tabBodyHtml);
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide:eq(0)").addClass("on");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").css("display", "none");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='0']").css("display", "inline-block");
                setTimeout(function() {
                    slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");
                    // BTOCSITE-2944 오브제컬렉션 체험하기 탭이동 수정 210709
                    // $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper [data-model-typ='" + _modelCate2 + "']").attr("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper [data-model-typ='" + _modelCate2 + "']").closest(".swiper-slide").siblings().removeClass("on");
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper [data-model-typ='" + _modelCate2 + "']").closest(".swiper-slide").addClass("on");
                    let subIdx = $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide.on").index();
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='" + subIdx + "']").siblings().css("display", "none");
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='" + subIdx + "']").css("display", "inline-block");
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "']").attr("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "']").closest(".swiper-slide").siblings().removeClass("is_active");
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "']").addClass("is_active").attr("disabled", false);
                    let _modelName = $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "'] .model_name").text();
                    modelSimulator.stepOneNext(0, _modelCate2, _modelName, _defaultModelCode, _modelCate);
                }, 100);

            } else if (kimModelFilter(_defaultModelCode).length > 0) {
                resultFilter = kimModelFilter(_defaultModelCode);
                _modelCate = configData.modelConfig[resultFilter[0]].id;
                _modelMiniCate = "rf_kim";
                _leaderImg = configData.modelConfig[resultFilter[0]].leaderImg;
                _simulImg = configData.modelConfig[resultFilter[0]].simulImg;
                _defaultPrice = configData.modelConfig[resultFilter[0]].defaultPrice;
                _count = configData.modelConfig[resultFilter[0]].door.count;
                _doorKLocation.push(configData.modelConfig[resultFilter[0]].door.door1.name);
                _doorPrice.push(configData.modelConfig[resultFilter[0]].door.door1.defaultPrice);
                _doorKLocation.push(configData.modelConfig[resultFilter[0]].door.door2.name);
                _doorPrice.push(configData.modelConfig[resultFilter[0]].door.door2.defaultPrice);
                _doorKLocation.push(configData.modelConfig[resultFilter[0]].door.door3.name);
                _doorPrice.push(configData.modelConfig[resultFilter[0]].door.door3.defaultPrice);
                setTimeout(function() {
                    $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='" + _modelCate + "']").addClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
                }, 100);
                _modelName = $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='" + _modelCate + "']").attr("data-name");
                setTimeout(function() {
                    modelSimulator.stepOneNext(1, _modelCate, _modelName);
                }, 100);
            } else if (conModelFilter(_defaultModelCode).length > 0) {
                let tabBodyHtml = '';
                resultFilter = conModelFilter(_defaultModelCode);
                _modelCate = configData.modelConfig[resultFilter[0]].id;
                _modelMiniCate = "rf";
                _modelCate2 = configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].typ;
                _leaderImg = configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].leaderImg;
                _simulImg = configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].simulImg;
                _defaultPrice = configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].defaultPrice;
                _count = configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].door.count;
                _doorKLocation.push(configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].door.door1.name);
                _doorPrice.push(configData.modelConfig[resultFilter[0]].typModel[resultFilter[1]].door.door1.defaultPrice);
                setTimeout(function() {
                    $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='" + _modelCate + "']").addClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
                }, 100);

                let tabSubLeng = configData.modelConfig[2].typModel.length;
                for (let j = 0; j < tabSubLeng; j++) {
                    tabBodyHtml += '<div class="swiper-slide" data-typ-filter="0">';
                    tabBodyHtml += '    <button type="button" data-index="' + j + '" data-name="' + configData.modelConfig[2].typModel[j].name + '" data-lead-name="' + configData.modelConfig[2].id + '" data-default-code="' + configData.modelConfig[2].typModel[j].defaultCode + '" class="btn_model_sub_pick">';
                    tabBodyHtml += '        <span class="pic"><img src="' + configData.modelConfig[2].typModel[j].leaderImg + '" alt=""/></span>';
                    tabBodyHtml += '        <span class="model_name">' + configData.modelConfig[2].typModel[j].name + '</span>';
                    tabBodyHtml += '    </button>';
                    tabBodyHtml += '</div>';
                }
                $(".model_choice_area .model_sub_tab_wrap").addClass("is_active");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont").addClass("is_active");
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper").html(tabBodyHtml);
                $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='0']").css("display", "inline-block");
                let _modelName = $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "'] .model_name").text();
                setTimeout(function() {
                    slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");
                    $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide [data-default-code='" + _defaultModelCode + "']").addClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", true);
                    $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").prop("disabled", true);
                    modelSimulator.stepOneNext(2, _modelCate2, _modelName, _defaultModelCode, _modelCate);

                }, 100);

            }
            /*setTimeout(function() {
                let doorLeng = _doorKName.length;
                for (let i = 0; i < doorLeng; i++) {
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-model_spec_material", _doorMaterial[i]);
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-model_spec_color", _doorColor[i]);
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-price", _doorPrice[i]);
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-code", _doorCode[i]);
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-klocation", _doorKLocation[i]);
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ")").attr("data-door-text", _doorKName[i]);
                    let doorImgUrl1 = "/lg5-common/images/OBJ/experience/" + _modelCate + "/";
                    let doorImgUrl2 = _modelMiniCate + "_door_" + _doorLocation[i] + "_" + _doorMaterial[i] + "_" + _doorColor[i] + ".png";
                    let doorImgUrl = doorImgUrl1 + doorImgUrl2;
                    let doorImg = '<img src="' + doorImgUrl + '" alt="" />'
                    $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(" + i + ") .door_img").html(doorImg);
                    $(".model_set_wrap[data-model-editing='Y']").attr({ "data-best": "Y", "data-best-code": modelCode, "data-model-completed": "N" });
                    modelSimulator.stepThree();
                }
            }, 500);*/
            setTimeout(function() {
                if ($(window).width() > 767) {
                    $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
                } else {
                    modelSimulator.mobileStep(".simul_step2");
                }
                $(".model_set_wrap[data-model-editing='Y'] .model_door:eq(0)").attr("data-edit", "Y");
                modelSimulator.stepTwo(0);
                $(".color_sel_wrap").addClass("is_active");
                $(".simul_step2 .etc_area").addClass("is_active");
                pickerPosition = $(".color_sel_wrap .swiper-wrapper").css("transform");
            }, 500);

            /* BTOCSITE-1582 add */
            var $objContent = $('.model_experience');
            if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
                $('#quick_buy').show();
            }
            /* //BTOCSITE-1582 add */
        }
    }
    $(window).load(function() {
        //스텝2 테스트
        //modelSimulator.pdpProductStep("M870GSB451S");
        //modelSimulator.pdpProductStep("M870FBB451S");
        //modelSimulator.pdpProductStep("Z330FSS151S");
        //modelSimulator.pdpProductStep("Y320MWS");
    });





    function rfModelFilter(code) {
        let returnIdx = [];
        let _refrigeratorType = configData.modelConfig[0].refrigeratorType;
        for (let i = 0; i < _refrigeratorType.length; i++) {
            let _typModel = _refrigeratorType[i].typModel;
            for (let j = 0; j < _typModel.length; j++) {
                if (_typModel[j].defaultCode == code) {

                    returnIdx.push(0);
                    returnIdx.push(i);
                    returnIdx.push(j);

                }
            }
        }
        return returnIdx;
    }

    function kimModelFilter(code) {
        let returnIdx = [];
        let _defaultModel = configData.modelConfig[1].defaultCode;
        if (_defaultModel == code) {
            returnIdx.push(1);
        }
        return returnIdx;
    }

    function conModelFilter(code) {
        let returnIdx = [];
        let _typModel = configData.modelConfig[2].typModel;
        for (let i = 0; i < _typModel.length; i++) {
            if (_typModel[i].defaultCode == code) {
                returnIdx.push(2);
                returnIdx.push(i);
            }
        }
        return returnIdx;
    }
})();;
var modelSimulator;
var bestSeller;
var proposeSet;
var myPickSet;
var pickerPosition = 0;

function addComma(value) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}

function minusComma(value) {
    value = value.replace(/[^\d]+/g, "");
    return value;
}

//제품과 도어의 가격과 할인정보 //개발에서 함수로 반환해줌 //견적확인 버튼을 눌렀을때
// BTOCSITE-3198 - pannelType 매개변수(파라미터) 추가
function resultDoorPrice(idx, price, memberDiscount, directDiscount, pannelType) {
    //console.log("resultDoorPrice", price);
    // console.log("price", price);
    // console.log("memberDiscount", memberDiscount);
    // console.log("directDiscount", directDiscount);
    let priceLeng = price.length;
    let sumPrice = 0;
    for (let i = 0; i < priceLeng; i++) {
        
        // console.log("price[i]", price[i])
        // BTOCSITE-2989 :: 추천모델일때 패널 가격 빼서 보여주는 부분 삭제
        // if( $('.model_set_wrap').attr('data-best') == "Y" && i == 0) {
            
        //     price.forEach(function(v, i){
        //         if( i > 0) {
        //             price[0] -= v;
        //         }
        //     })
            
            
        // }

        //BTOCSITE-3198 - pannelType 분기처리 조건 추가 211020 - S
        if(pannelType == 'pannel'){
            // 패널만 교체
            let j = i+1;
            if(j == priceLeng) {
                return false;
            } else {
                $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list li:eq(" + i + ") .product_price em").text(addComma(price[j]));
                sumPrice += parseInt(price[j]);
            }
        } else {
            // 견적 확인하기 (pannelType == 'normal');
            $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list li:eq(" + i + ") .product_price em").text(addComma(price[i]));
            sumPrice += parseInt(price[i]);
        }
        
        // $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list li:eq(" + i + ") .product_price em").text(addComma(price[i]));
        // sumPrice += parseInt(price[i]);

        //BTOCSITE-3198 - pannelType 분기처리 조건 추가 211020 - E

        
        if (i == (priceLeng - 1)) {
            let memberDiscountSum = 0;
            let directDiscountSum = 0;
            //BTOCSITE-2346 210811 수정
            // if( $('.model_set_wrap').attr('data-best') == "Y" ) {
            //     memberDiscountSum = memberDiscount[0];
            //     directDiscountSum = directDiscount[0];
            // } else {
                for (let j = 0; j < memberDiscount.length; j++) {
                    memberDiscountSum += parseInt(memberDiscount[j]);
                }
                for (let j = 0; j < directDiscount.length; j++) {
                    directDiscountSum += parseInt(directDiscount[j]);
                }
            // }
            //BTOCSITE-2346 210811 수정
            setTimeout(function() {
                let resultDuiscount = parseInt(memberDiscountSum) + parseInt(directDiscountSum);
                let resultSum = parseInt(sumPrice) - parseInt(resultDuiscount);

                if (resultDuiscount == 0) {
                    $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list .sum .product_price .before_price").remove();
                } else {
                    $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list .sum .product_price .before_price em").text(addComma(sumPrice));
                }

                $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + idx + ")").find(".product_list .sum .product_price .after_price em").text(addComma(resultSum));
            }, 10);

            //totalResulPrice();
        }
    }
    setTimeout(function() {
        $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
    }, 200);



}
//스텝3 비교하기에 나오는 가격 노출되는 함수 //개발에서 함수로 반환해줌
function resultModelPrice(price) {
    /* BTOCSITE-1582 */
    var $objContent = $('.model_experience');
    if ($objContent.attr('data-page-type') === 'NEWBEST' || $objContent.attr('data-page-type') === 'HIMART' || $objContent.attr('data-page-type') === 'ETLAND'){ //210805 BTOCSITE-3487
        //alert('견적확인결과' + price);
        $(".simul_step3 .btn_check_price").trigger('click');
    }
    /* //BTOCSITE-1582 */

    let priceLeng = price.length;
    setTimeout(function() {
        $(".tb_compare").css("visibility", "visible");
        for (let i = 0; i < priceLeng; i++) {
            if (price[i] == "nodata" || price[i] == "undefined" || price[i] === undefined || price[i] == '') {
                $(".tb_compare tbody tr:eq(" + i + ")").css("display", "none");

            } else {
                $(".tb_compare tbody tr:eq(" + i + ") td:last-child span").text(addComma(price[i]));
            }

        }
        setTimeout(function() {
            if ($(".tb_compare tbody tr").length > 0) {
                $(".simul_step3 .etc_area").addClass("is_active");
            } else {
                $(".simul_step3 .etc_area").removeClass("is_active");
            }
        });
    }, 100);

}
//제품이 여러개 였을 경우 각각의 가격을 합산해서 뿌려줌
function totalResulPrice() {
    setTimeout(function() { 
        let resultLeng = $(".total_price_info_body .swiper-wrapper .swiper-slide").length;
        let totalPrice = 0;
        if (resultLeng == 0) {
            $(".total_result_price .cont .price em").text(0);
        }
        for (let i = 0; i < resultLeng; i++) {
            let sumPrice = $(".total_price_info_body .swiper-wrapper .swiper-slide:eq(" + i + ") .product_list .sum .product_price em").text();
            totalPrice += parseInt(minusComma(sumPrice));
            if (i == (resultLeng - 1)) {
                $(".total_result_price .cont .price em").text(addComma(totalPrice));
            }
        }
    }, 200);


}