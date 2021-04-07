(function() {
    //제품 정보 셋팅
    var configData = {

        modelConfig: [{
                name: "냉장고",
                id: "refrigerator",
                leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator.png",
                refrigeratorType: [{
                    typeName: "얼음정수기형",
                    typ: "refrigerator1",
                    typModel: [{
                        name: "얼음정수기냉장고",
                        defaultCode: "W821AAA453",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_W821AAA453.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_W821AAA453.png",
                        defaultPrice: "1,000,000",
                        memberDiscount: "0",
                        directDiscount: "0",
                        magicSpace: 1,
                        energy: 3,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "얼정냉 상단(좌)",
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                    typModel: [{
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                        name: "노크온 매직스페이스",
                        defaultCode: "M870AAA451",
                        subModel: [{
                            modelCode: "M870AAA452",
                            magicSpace: 1,
                            energy: 2,
                            knockOn: true,
                            defaultPrice: "0",
                            memberDiscount: "0",
                            directDiscount: "0",
                        }],
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                        name: "베이직",
                        defaultCode: "M871AAA041",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA041.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M871AAA041.png",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
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
                                desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                                desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                                desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                                descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                }]
            },
            {
                name: "김치냉장고",
                id: "refrigerator_kimchi",
                leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator_kimchi.png",
                defaultCode: "Z330AAA151",
                simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_refrigerator_kimchi.png",
                defaultPrice: "0",
                memberDiscount: "0",
                directDiscount: "0",
                door: {
                    count: 3,
                    door1: {
                        name: "상",
                        code: "K330TT",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                    },
                    door2: {
                        name: "중",
                        code: "K330MM",
                        defaultPrice: "0",
                        memberDiscount: "0",
                        directDiscount: "0",
                    },
                    door3: {
                        name: "하",
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

                }, {
                    doorMaterial: {
                        name: "솔리드",
                        enName: "Solid Metal",
                        code: "S",
                        desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                        desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                        desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                        descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                            desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                            desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                            desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                            descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                            desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                            desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                            desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                            descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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
                            desc: "메탈 본연의 세련됨과 트렌드를 담은 무광의 완벽한 조화. <br>매트한 스테인리스가 모던하고 아름다운 공간으로 연출합니다.",
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
                            desc: "고운 안개처럼 부드러운 터치감을 느낄 수 있는 <br>매트한 유리 소재로, 공간에 은은하게 어우러집니다.",
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
                            desc: "자연을 본뜬 질감 메탈 소재로 어느 공간에 두어도 차분하고 <br>편안한 감각을 표현해주는 소재입니다.",
                            descImg: "/lg5-common/images/OBJ/simulator/img/img-Mist.jpg",
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









    $(document).ready(function() {
        modelSimulator.init();

        $(".model_simul_step_wrap").mCustomScrollbar();
        simulPositionAutoMove();
        $(window).on("resize", function() {
            simulPositionAutoMove();
        });
        $(window).on("scroll", function() {
            simulPositionAutoMove();
        });


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
                    $(".simul_step3 .etc_area").removeClass("is_active");
                    $(".simul_step3 .compare_sel_model_area").removeClass("is_active");
                    let idx = $(".model_set_wrap[data-model-editing='Y']").index();
                    priceSumList.removeSlide(idx);
                    $(".model_set_wrap[data-model-editing='Y']").remove();
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
                }
            };
            var desc = '';
            obj = $.extend(obj, { title: '체험할 제품을 다시 선택하시겠습니까??', cancelBtnName: '아니오', okBtnName: '예', });
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
            modelSimulator.childModel($(this));
            modelSimulator.maxCountCheck();
        });

        //제품선택 탭이벤트
        $(document).on("click", ".model_choice_area .model_sub_tab_wrap .model_sub_tab_head button", function(e) {
            let idx = $(this).closest(".swiper-slide").index();
            console.log("idx", idx);
            $(this).closest(".swiper-slide").addClass("on");
            $(this).closest(".swiper-slide").siblings(".swiper-slide").removeClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide:eq(" + idx + ")").addClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").css("display", "none");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='" + idx + "']").css("display", "inline-block");
            slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");
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
            modelSimulator.stepOneNext(idx, _name, name, code, leadName);
            modelSimulator.maxCountCheck();
        });

        //문선택을 위한 제품 선택
        $(document).on("click", ".model_set_wrap .btn_model_sel", function(e) {
            $(this).closest(".model_set_wrap").siblings().attr("data-model-editing", 'N');
            $(this).closest(".model_set_wrap").attr("data-model-editing", 'Y');
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
                    $(".model_set_wrap:last-child").attr("data-model-add", 'Y');
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", false);
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
                    if ($(".model_set_wrap").length == 1) {
                        $(".model_set_wrap").attr("data-del", "N");
                    }
                    modelSimulator.maxCountCheck();
                    priceSumList.removeSlide(idx);
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
        });

        //문짝 색상 선택
        $(document).on("click", ".color_sel_wrap .btn_door_color_sel", function() {
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
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_spec_material", mCode);
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_spec_color", cCode);
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-price", doorPrice);
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-code", doorCode);
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-klocation", doorKlocation);
            $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-text", textColor);
            console.log("modelCate", modelCate);
            if (modelCate == "refrigerator1") {
                modelCate = "refrigerator";
            } else if (modelCate == "refrigerator2") {
                modelCate = "refrigerator";
            }
            console.log("modelCate", modelCate);
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

            completedCheck();
        });

        //기능가격 비교 선택
        $(document).on("click", ".compare_sel_model_area .tb_compare tbody tr", function() {
            $(this).siblings().removeClass("is_active");
            $(this).addClass("is_active");
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
            } else {
                let desc = "";
                let obj = {
                    title: '진행중인 제품을 먼저 <br />완성해 주시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
            }
        });

        //구매 합계
        $(".total_price_info_wrap .btn_price_open").on("click", function() {
            $(this).closest(".total_price_info_wrap").addClass("is_active");
        });
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
            });
            if ($(".simul_wrap .model_set_wrap[data-model-editing='Y']").attr("data-model-completed") == "Y") {
                var obj = {
                    title: '',
                    typeClass: '',
                    cancelBtnName: '',
                    okBtnName: '',
                    ok: function() {
                        console.log("저장");
                    }
                };
                var desc = '';
                obj = $.extend(obj, { title: '체험하신 내용을 저장하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
                desc = '';
                lgkorUI.confirm(desc, obj);

                modelSimulator.priceCheck(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo);
            } else {
                let desc = "";
                let obj = {
                    title: '모든 컬러 선택 완료 후 <br />견적 확인하시기 바랍니다.'
                };
                lgkorUI.alert(desc, obj);
            }

        });
        //구매하기
        $(document).on("click", ".btn_purchase", function() {
            let purchaseData = [];
            $(this).closest(".swiper-slide").find(">dl .product_list li").each(function() {
                if (!$(this).hasClass("sum")) {
                    purchaseData.push($(this).attr("data-default-code"));
                }
            });
            purchaseFn(purchaseData);

        });



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
        priceSumList = new Swiper(".total_price_info_body .swiper-container", {
            slidesPerView: 3,
            //slidesPerView: 'auto',
            spaceBetween: 40,
            // preventClicks: false,
            // preventClicksPropagation: false,
            navigation: {
                nextEl: '.total_price_info_body .swiper-button-next',
                prevEl: '.total_price_info_body .swiper-button-prev',
            },
        });

    });
    var simulBodySwiper;
    var priceSumList;

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

    function slideWrapAutoSize(slideTarget) {
        let slideLeng = $(slideTarget).find(".swiper-slide").length;
        let slideW = $(slideTarget).find(".swiper-slide").width();
        $(slideTarget).find(".swiper-slide").each(function() {
            if ($(this).css("display") == "none") {
                slideLeng = slideLeng - 1;
            }
        });
        let slideWrapW = (slideW * slideLeng);
        $(slideTarget).find(".swiper-wrapper").css("width", slideWrapW);
        $(slideTarget).find(".swiper-notification").remove();
        var modelSubTabCont = new Swiper(slideTarget, {
            //slidesPerView: 5,
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

    function completedCheck() {
        let completed = "Y";
        $(".model_set_wrap[data-model-editing='Y'] .model_door").each(function() {
            if ($(this).find(".door_img img").length == 0) {
                completed = "N";
            }
        });

        if (completed == "Y") {
            modelSimulator.stepThree();
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

    var modelSimulator = {
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
        maxCountCheck: function() {
            let maxSetting = 5;
            let maxCount = 0;
            $(".simul_wrap .simul_body .model_set_wrap").each(function() {
                console.log('$(this).attr("data-model-cate")', $(this).attr("data-model-cate"));
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
        },
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
            slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");

        },
        stepOneNext: function(idx, _name, name, code, leadName) { //2단계로 넘어간다
            $(".model_simul_area").addClass("is_active");
            $(".simul_wrap").addClass("is_active");
            let simulBodyHtml = '<div data-model-cate="" data-model_code="" data-del="N" data-model-add="Y" data-model-editing="Y" data-model-completed="N" class="swiper-slide model_set_wrap">';
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
            if (modelAdd == "Y" && addActive == "Y") {
                simulBodySwiper.appendSlide(simulBodyHtml);
                // $(".simul_body").append(simulBodyHtml);
                // simulBodySwiper.updateSlides();
                $(".simul_wrap").attr("data-add-active", "N");
                simulBodySwiper.updateSlides();
            } else {
                if ($(".model_set_wrap").length == 0) {
                    simulBodySwiper.appendSlide(simulBodyHtml);
                    // $(".simul_body").html(simulBodyHtml);
                    simulBodySwiper.updateSlides();
                    //제품 스와이프 슬라이드

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
                                            if (code == "W821AAA453") {
                                                doorDirection = "LT";
                                                doorLocation = "JT";
                                            }
                                        } else if (k == 1) {
                                            doorDirection = "LB";
                                            doorLocation = "BB";
                                        } else if (k == 2) {
                                            doorDirection = "RB";
                                            doorLocation = "BB";
                                        }
                                        doorHtml += '<button type="button" data-edit="N" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
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
                                        } else if (k == 1) {
                                            doorDirection = "RT";
                                            doorLocation = "TT";
                                        } else if (k == 2) {
                                            doorDirection = "LB";
                                            doorLocation = "BB";
                                        } else if (k == 3) {
                                            doorDirection = "RB";
                                            doorLocation = "BB";
                                        }
                                        doorHtml += '<button type="button" data-edit="N" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                                        doorHtml += '   <span class="blind">도어 선택</span>';
                                        doorHtml += '   <span class="door_img"></span>';
                                        doorHtml += '</button>';
                                    }
                                }
                            }
                        }
                    }
                }

            } else if (idx == 1) { //김치냉장고
                code = configData.modelConfig[idx].defaultCode;
                modelWrap.attr({ "data-model-cate": _name, "data-model_code": code });
                defaultImg = configData.modelConfig[idx].simulImg;
                modelPrice = configData.modelConfig[idx].defaultPrice;
                doorLeng = configData.modelConfig[idx].door.count;
                $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
                if (doorLeng == 3) {
                    for (let k = 0; k < doorLeng; k++) {
                        let doorDirection;
                        let doorLocation;
                        if (k == 0) {
                            doorDirection = "TT";
                            doorLocation = "TT";
                        } else if (k == 1) {
                            doorDirection = "MM";
                            doorLocation = "MM";
                        } else if (k == 2) {
                            doorDirection = "BB";
                            doorLocation = "BB";
                        }
                        doorHtml += '<button type="button" data-edit="N" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                        doorHtml += '   <span class="blind">도어 선택</span>';
                        doorHtml += '   <span class="door_img"></span>';
                        doorHtml += '</button>';
                    }
                }
                //console.log("code", code);
            } else if (idx == 2) { //컨버터블
                //code = configData.modelConfig[idx].typModel[i].defaultCode;
                modelWrap.attr({ "data-model-cate": leadName, "data-model_code": code });
                let forLeng = configData.modelConfig[idx].typModel.length;
                for (let i = 0; i < forLeng; i++) {
                    if (code == configData.modelConfig[idx].typModel[i].defaultCode) {
                        defaultImg = configData.modelConfig[idx].typModel[i].simulImg;
                        modelPrice = configData.modelConfig[idx].typModel[i].defaultPrice;
                        doorLeng = configData.modelConfig[idx].typModel[i].door.count;
                        $(".model_set_wrap[data-model-editing='Y']").attr("data-model-price", modelPrice);
                        if (doorLeng == 1) {
                            let doorDirection = "TT";
                            let doorLocation = "TT";
                            doorHtml += '<button type="button" data-edit="N" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
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





        },
        stepTwo: function(idx) {
            let modelCate = $(".model_choice_tab .btn_model_pick.is_active").attr("data-lead-name");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let doorDirection = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-direction");
            let doorLocation = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-model_location");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            if (modelCate == "refrigerator") {
                let refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType.length;
                for (let i = 0; i < refrigeratorTypeLeng; i++) {
                    if (configData.modelConfig[0].refrigeratorType[i].typ == modelCate2) {
                        let typModelLeng = refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType[i].typModel.length;
                        for (let j = 0; j < typModelLeng; j++) {
                            if (configData.modelConfig[0].refrigeratorType[i].typModel[j].defaultCode == modelCode) {
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
                                console.log("_door", _door);
                                doorPrice = _door.defaultPrice;
                                console.log("doorPrice", doorPrice);
                                _doorLocation = _door.name;
                                _doorFrontCode = _door.code;
                                let colorSelBodyHtml = '';
                                for (let k = 0; k < doorMaterialLeng; k++) {
                                    let doorColorLeng = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.doorColor.length;
                                    let doorMaterialName = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.name;
                                    let doorMaterialEnName = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.enName;
                                    let doorMaterialCode = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.code;
                                    let doorMaterialDesc = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData[k].doorMaterial.desc;
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
                                        colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>';
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
                                slideWrapAutoSize(".color_sel_wrap .color_sel_body");
                                break;
                            }
                        }
                        break;
                    }
                }
            } else if (modelCate == "refrigerator_kimchi") {
                let doorMaterialLeng = configData.modelConfig[1].doorColorData.length;
                let _door;
                let _doorFrontCode;
                let _doorLocation;
                let doorPrice;
                if (idx == 0) {
                    _door = configData.modelConfig[1].door.door1;
                } else if (idx == 1) {
                    _door = configData.modelConfig[1].door.door2;
                } else if (idx == 2) {
                    _door = configData.modelConfig[1].door.door3;
                } else if (idx == 3) {
                    _door = configData.modelConfig[1].door.door4;
                }
                doorPrice = _door.defaultPrice;
                _doorLocation = _door.name;
                _doorFrontCode = _door.code;
                let colorSelBodyHtml = '';
                for (let k = 0; k < doorMaterialLeng; k++) {
                    let doorColorLeng = configData.modelConfig[1].doorColorData[k].doorMaterial.doorColor.length;
                    let doorMaterialName = configData.modelConfig[1].doorColorData[k].doorMaterial.name;
                    let doorMaterialEnName = configData.modelConfig[1].doorColorData[k].doorMaterial.enName;
                    let doorMaterialCode = configData.modelConfig[1].doorColorData[k].doorMaterial.code;
                    let doorMaterialDesc = configData.modelConfig[1].doorColorData[k].doorMaterial.desc;
                    colorSelBodyHtml += '<div class="swiper-slide">';
                    colorSelBodyHtml += '   <dl>';
                    colorSelBodyHtml += '       <dt>' + doorMaterialName + '</dt>';
                    colorSelBodyHtml += '       <dd>';
                    colorSelBodyHtml += '           <ul>';
                    for (let l = 0; l < doorColorLeng; l++) {
                        let doorColorName = configData.modelConfig[1].doorColorData[k].doorMaterial.doorColor[l].name;
                        let doorColorCode = configData.modelConfig[1].doorColorData[k].doorMaterial.doorColor[l].code;
                        let doorColorMixingCode = configData.modelConfig[1].doorColorData[k].doorMaterial.doorColor[l].mixingCode;
                        let colorImgUrl = '/lg5-common/images/OBJ/experience/color/';
                        let colorImgName = 'color_' + doorMaterialCode + '_' + doorColorCode + '.png';
                        let colorHtml = '<li>';
                        colorHtml += '  <button type="button" data-door-code="' + _doorFrontCode + '" data-door-klocation="' + _doorLocation + '" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" data-door-price="' + doorPrice + '" class="btn_door_color_sel">';
                        colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                        colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>';
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
                slideWrapAutoSize(".color_sel_wrap .color_sel_body");
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
                                colorHtml += '      <span class="color_name">' + doorMaterialName + ' <br>' + doorColorName + '</span>';
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
                        slideWrapAutoSize(".color_sel_wrap .color_sel_body");
                    }
                }
            }
            $(".model_choice_area .model_choice_tab .btn_model_pick").not(".is_active").prop("disabled", true);
            $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").not(".is_selected").prop("disabled", true);
            $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
        },
        stepThree: function() {
            let modelCate1 = $(".model_set_wrap[data-model-editing='Y']").attr("data-model-cate");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let tblHtml = '';
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
                                let mainPrice = _typModel[j].defaultPrice;
                                tblHtml += '<div class="tb_row tb_compare">';
                                tblHtml += '    <table>';
                                tblHtml += '        <caption>기능과 가격을 비교하여 모델 안내</caption>';
                                tblHtml += '        <colgroup>';
                                tblHtml += '            <col style="width:34%">';
                                tblHtml += '            <col style="width:20.5%">';
                                tblHtml += '            <col style="width:20.5%">';
                                tblHtml += '            <col style="width:25%">';
                                tblHtml += '        </colgroup>';
                                tblHtml += '        <thead>';
                                tblHtml += '            <tr>';
                                tblHtml += '                <th scope="col">모델명</th>';
                                tblHtml += '                <th scope="col">매직스페이스</th>';
                                tblHtml += '                <th scope="col">에너지 효율</th>';
                                tblHtml += '                <th scope="col">가격</th>';
                                tblHtml += '            </tr>';
                                tblHtml += '        </thead>';


                                tblHtml += '<tr class="is_active">';
                                tblHtml += '    <td><span>' + modelCode + '</span></td>';
                                tblHtml += '    <td>' + mainMagicSpace + '개</td>';
                                tblHtml += '    <td>' + mainEnergy + '등급</td>';
                                tblHtml += '    <td>' + mainPrice + '원</td>';
                                tblHtml += '</tr>';
                                if (_typModel[j].subModel != undefined && _typModel[j].subModel != "") {
                                    let _subModel = _typModel[j].subModel;
                                    for (let k = 0; k < _subModel.length; k++) {
                                        let subCode = _subModel[k].modelCode;
                                        let subMagicSpace = _subModel[k].magicSpace;
                                        let subEnergy = _subModel[k].energy;
                                        let subKnockOn = _subModel[k].knockOn;
                                        let subPrice = _subModel[k].defaultPrice;
                                        tblHtml += '<tr>';
                                        tblHtml += '    <td><span>' + subCode + '</span></td>';
                                        tblHtml += '    <td>' + subMagicSpace + '개</td>';
                                        tblHtml += '    <td>' + subEnergy + '등급</td>';
                                        tblHtml += '    <td>' + subPrice + '원</td>';
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
                let refrigeratorType = configData.modelConfig[1].defaultCode;
                let mainPrice = configData.modelConfig[1].defaultPrice;
                tblHtml += '<div class="tb_row tb_compare">';
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
                tblHtml += '<tr class="is_active">';
                tblHtml += '    <td><span>' + refrigeratorType + '</span></td>';
                tblHtml += '    <td>' + mainPrice + '원</td>';
                tblHtml += '</tr>';
                tblHtml += '        </tbody>';
                tblHtml += '    </table>';
                tblHtml += '</div>';
            } else if (modelCate1 == "refrigerator_convertible") {
                let _typModel = configData.modelConfig[2].typModel;
                for (let i = 0; i < _typModel.length; i++) {
                    if (_typModel[i].defaultCode == modelCode) {
                        let mainPrice = _typModel[i].defaultPrice;
                        tblHtml += '<div class="tb_row tb_compare">';
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
                        tblHtml += '<tr class="is_active">';
                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                        tblHtml += '    <td>' + mainPrice + '원</td>';
                        tblHtml += '</tr>';
                        tblHtml += '        </tbody>';
                        tblHtml += '    </table>';
                        tblHtml += '</div>';
                    }
                }
            }
            $(".compare_sel_model_area").addClass("is_active").html(tblHtml);
            $(".simul_step3 .etc_area").addClass("is_active");
            $(".model_simul_step_wrap").mCustomScrollbar("scrollTo", "bottom", 0);
        },
        priceCheck: function(idx, modelCate, modelName, defaultModel, defaultPrice, doorInfo) {
            console.log("idx", idx);
            console.log("modelTyp", modelCate);
            console.log("defaultModel", defaultModel);
            console.log("doorInfo", doorInfo);
            let priceHtml = '';
            let sumPrice = 0;
            priceHtml += '<div class="swiper-slide">';
            priceHtml += '  <dl data-cate="' + modelCate + '" data-default-code="' + defaultModel + '" data-default-price="' + defaultPrice + '">';
            priceHtml += '      <dt>' + modelName + '</dt>';
            priceHtml += '      <dd>';
            priceHtml += '          <div class="price_info">';
            priceHtml += '              <ul class="product_list">';
            priceHtml += '                  <li data-default-code="' + defaultModel + '">';
            priceHtml += '                      <span class="product_name">' + defaultModel + '</span>';
            priceHtml += '                      <span class="product_price"><em>' + defaultPrice + '</em>원</span>';
            priceHtml += '                  </li>';
            sumPrice += parseInt(minusComma(defaultPrice));
            for (let i = 0; i < doorInfo.length; i++) {
                priceHtml += '                  <li data-default-code="' + doorInfo[i][5] + '-' + doorInfo[i][2] + doorInfo[i][3] + '">';
                priceHtml += '                      <span class="product_name">' + doorInfo[i][6] + ' ' + doorInfo[i][7] + '</span>';
                priceHtml += '                      <span class="product_price"><em>' + doorInfo[i][4] + '</em>원</span>';
                priceHtml += '                  </li>';
                sumPrice += parseInt(minusComma(doorInfo[i][4]));
            }
            sumPrice = addComma(sumPrice);
            priceHtml += '                                        <li class="sum">';
            priceHtml += '                                            <span class="product_name">합계</span>';
            priceHtml += '                                            <span class="product_price"><em>' + sumPrice + '</em>원</span>';
            priceHtml += '                                        </li>';
            priceHtml += '                                    </ul>';
            priceHtml += '                                    <button class="btn btn_purchase"><span>구매하기</span></button>';
            priceHtml += '                                </div>';
            priceHtml += '                            </dd>';
            priceHtml += '                        </dl>';
            priceHtml += '                    </div>';
            let sumSlide = $(".total_price_info_body .swiper-wrapper .swiper-slide");
            console.log('idx', idx);
            console.log('sumSlide.length', sumSlide.length);
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
            $(".total_price_info_wrap").addClass("is_active");
            //토탈 sum가격 구하기
            setTimeout(function() {
                let totalSumPrice = 0;
                $(".total_price_info_body .swiper-wrapper .swiper-slide").each(function() {
                    console.log('$(this).find(".sum .product_price em").text()', $(this).find(".sum .product_price em").text());
                    totalSumPrice += parseInt(minusComma($(this).find(".sum .product_price em").text()));
                });
                console.log(addComma(totalSumPrice));
                $(".total_result_price .price em").text(addComma(totalSumPrice));
            }, 100);

        }
    }

    function addComma(value) {
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value;
    }

    function minusComma(value) {
        value = value.replace(/[^\d]+/g, "");
        return value;
    }
})();;