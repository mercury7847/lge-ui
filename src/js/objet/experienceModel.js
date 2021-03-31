(function() {
    //제품 정보 셋팅
    var configData = {

        simulModel: [{
            modelConfig: {
                name: "냉장고",
                id: "refrigerator",
                leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator.png",
                refrigeratorType: [{
                    typeName: "얼음정수기형",
                    typModel: [{
                        name: "얼음정수기냉장고",
                        defaultCode: "W821AAA453",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_W821AAA453.png",
                        magicSpace: 1,
                        energy: 3,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "얼정냉 상단(좌)",
                                code: "D870JT"
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB"
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB"
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
                    typModel: [{
                        name: "노크온 더블 매직스페이스",
                        defaultCode: "M871AAA551",
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA551.png",
                        magicSpace: 2,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT"
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB"
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB"
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
                        }],
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M870AAA451.png",
                        magicSpace: 1,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT"
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB"
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB"
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
                        magicSpace: 0,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D620TT"
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D620BB"
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D620BB"
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
                        }],
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA151.png",
                        magicSpace: 1,
                        energy: 1,
                        knockOn: false,
                        door: {
                            count: 4,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT"
                            },
                            door2: {
                                name: "상단(우)",
                                code: "D870TT"
                            },
                            door3: {
                                name: "하단(좌)",
                                code: "D870BB"
                            },
                            door4: {
                                name: "하단(우)",
                                code: "D870BB"
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
                        door: {
                            count: 4,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT"
                            },
                            door2: {
                                name: "상단(우)",
                                code: "D870TT"
                            },
                            door3: {
                                name: "하단(좌)",
                                code: "D870BB"
                            },
                            door4: {
                                name: "하단(우)",
                                code: "D870BB"
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
            modelConfig: {
                name: "김치냉장고",
                id: "refrigerator_kimchi",
                leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator_kimchi.png",
            },
            modelConfig: {
                name: "컨버터블",
                id: "refrigerator_convertible",
                leaderImg: "/lg5-common/images/OBJ/experience/leader/default_model_cate_refrigerator_convertible.png",
            }
        }]
    }


    modelSimulator.prototype = {
        init: function() {
            let simulModelLeng = configData.simulModel.modelConfig.length;
            console.log("simulModelLeng", simulModelLeng);
        }
    }






    $(document).ready(function() {
        ModelSimulator.init()


        simulPositionAutoMove();
        $(window).on("resize", function() {
            simulPositionAutoMove();
        });
        $(window).on("scroll", function() {
            simulPositionAutoMove();
        });
    });

    function simulPositionAutoMove() { //화면 넓이에 따른 시뮬레이션 위치 변경 및 위치 따라다니기
        let simulLand;
        if ($(window).width() > 767) {
            simulLand = $(".model_simul_area.area1"); //pc버전
        } else {
            simulLand = $(".model_simul_area.area2"); //모바일버전
        }
        let landT = simulLand.offset().top;
        let landL = simulLand.offset().left;
        let scrollT = $(window).scrollTop();
        let scrollL = $(window).scrollLeft();
        $(".simul_wrap").css({
            "left": (landL - scrollL),
            "top": (landT - scrollT)
        });
    }





})();