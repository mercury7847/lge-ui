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
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
                        magicSpace: 1,
                        energy: 3,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "얼정냉 상단(좌)",
                                code: "D870JT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
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
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
                        magicSpace: 2,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
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
                            defaultPrice: "",
                            memberDiscount: "",
                            directDiscount: "",
                        }],
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M870AAA451.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M870AAA451.png",
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
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
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M620AAA351.png",
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
                        magicSpace: 0,
                        energy: 1,
                        knockOn: true,
                        door: {
                            count: 3,
                            door1: {
                                name: "상단(좌)",
                                code: "D620TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door2: {
                                name: "하단(좌)",
                                code: "D620BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door3: {
                                name: "하단(우)",
                                code: "D620BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
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
                            defaultPrice: "",
                            memberDiscount: "",
                            directDiscount: "",
                        }],
                        leaderImg: "/lg5-common/images/OBJ/experience/leader/leader_img_M871AAA151.png",
                        simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_M871AAA151.png",
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
                        magicSpace: 1,
                        energy: 1,
                        knockOn: false,
                        door: {
                            count: 4,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door2: {
                                name: "상단(우)",
                                code: "D870TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door3: {
                                name: "하단(좌)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door4: {
                                name: "하단(우)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
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
                        defaultPrice: "",
                        memberDiscount: "",
                        directDiscount: "",
                        door: {
                            count: 4,
                            door1: {
                                name: "상단(좌)",
                                code: "D870TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door2: {
                                name: "상단(우)",
                                code: "D870TT",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door3: {
                                name: "하단(좌)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
                            },
                            door4: {
                                name: "하단(우)",
                                code: "D870BB",
                                defaultPrice: "",
                                memberDiscount: "",
                                directDiscount: "",
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
                defaultPrice: "",
                memberDiscount: "",
                directDiscount: "",
                door: {
                    count: 3,
                    door1: {
                        name: "상",
                        code: "K330TT"
                    },
                    door2: {
                        name: "중",
                        code: "K330MM"
                    },
                    door3: {
                        name: "하",
                        code: "K330BB"
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
                defaultCode: "X320AA",
                simulImg: "/lg5-common/images/OBJ/experience/leader/simul_img_refrigerator_convertible.png",
                defaultPrice: "",
                memberDiscount: "",
                directDiscount: "",
                door: {
                    count: 1,
                    door1: {
                        name: "도어",
                        code: "B320TT"
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
                    $(".color_mixing_area .color_sel_wrap").removeClass("is_active");
                    $(".color_mixing_area .color_my_pick").removeClass("is_active");
                    $(".color_mixing_area .color_best").removeClass("is_active");
                    $(".simul_step2 .etc_area").removeClass("is_active");
                    $(".simul_step3 .etc_area").removeClass("is_active");
                    $(".simul_step3 .compare_sel_model_area").removeClass("is_active");
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
            modelSimulator.childModel($(this));
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
            let code = $(this).attr("data-default-code");
            modelSimulator.stepOneNext(0, _name, name, code);
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
                    targetDel.closest(".model_set_wrap").remove();
                    $(".model_set_wrap:last-child").attr("data-model-add", 'Y');
                    $(".model_choice_area .model_choice_tab .btn_model_pick").prop("disabled", false);
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
                    $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
                    if ($(".model_set_wrap").length == 1) {
                        $(".model_set_wrap").attr("data-del", "N");
                    }
                }
            };
            var desc = '';
            obj = $.extend(obj, { title: '추가한 제품을 삭제하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
            desc = '';
            lgkorUI.confirm(desc, obj);

        });

        //문짝 선택
        $(document).on("click", ".model_set_wrap .model_door", function() {
            $(".model_set_wrap .model_door").not(this).attr("data-edit", "N");
            $(this).attr("data-edit", "Y");
            modelSimulator.stepTwo();
        });

        //문짝 색상 선택
        $(document).on("click", ".color_sel_wrap .btn_door_color_sel", function() {
            let mCode = $(this).attr("data-m-code");
            let mName = $(this).attr("data-m-name");
            let cCode = $(this).attr("data-c-code");
            let cName = $(this).attr("data-c-name");
            let mixCode = $(this).attr("data-mix-code");
            let modelCate = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-lead-name");
            let defaultModelCode = $(".model_set_wrap[data-model-editing='Y']").attr("data-model_code");
            let doorLocation = $(".model_set_wrap[data-model-editing='Y'] .model_door[data-edit='Y']").attr("data-door-model_location");
            let littleCate;
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
            if ($(this).closest(".model_set_wrap").attr("data-model-completed") == "Y") {
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
            pagination: {
                el: slideTarget + ' .swiper-pagination',
                clickable: true,
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
        $(".model_set_wrap[data-model-editing='Y']").attr("data-model-completed", completed);
        if (completed == "Y") {
            modelSimulator.stepThree();
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
                    pagination: {
                        el: '.model_choice_area .model_choice_tab .swiper-pagination',
                        clickable: true,
                    },
                });
            }


        },
        addSetting: function() {
            modelSimulator.init();
            $(".model_sub_tab_wrap").removeClass("is_active");
            $(".color_mixing_area .color_sel_wrap").removeClass("is_active");
            $(".color_mixing_area .color_my_pick").removeClass("is_active");
            $(".color_mixing_area .color_best").removeClass("is_active");
            $(".simul_step2 .etc_area").removeClass("is_active");
            $(".simul_step3 .etc_area").removeClass("is_active");
            $(".simul_step3 .compare_sel_model_area").removeClass("is_active");
            $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_active");
            $(".model_choice_area .model_choice_tab .btn_model_pick").removeClass("is_noActive");
            let maxSetting = 5;
            let maxCount = 0;
            $(".simul_wrap .simul_body .model_set_wrap").each(function() {
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
                $(".model_choice_area .model_choice_tab .btn_model_pick[data-lead-name='refrigerator']").prop("disabled", false);
            }
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
            let tabLeng = configData.modelConfig[idx].refrigeratorType.length;
            let tabHeadHtml = '';
            let tabBodyHtml = '';
            let rollingTab = [];
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
            //$(".model_choice_area .model_sub_tab_wrap").remove();
            $(".model_choice_area .model_sub_tab_wrap").addClass("is_active");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper").html(tabHeadHtml);
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper").html(tabBodyHtml);
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_head .swiper-wrapper .swiper-slide:eq(0)").addClass("on");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide").css("display", "none");
            $(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont .swiper-wrapper .swiper-slide[data-typ-filter='0']").css("display", "inline-block");
            slideWrapAutoSize(".model_choice_area .model_sub_tab_wrap .model_sub_tab_cont");

        },
        stepOneNext: function(idx, _name, name, code) { //2단계로 넘어간다
            $(".model_simul_area").addClass("is_active");
            $(".simul_wrap").addClass("is_active");
            let simulBodyHtml = '<div data-model-cate="" data-model_code="" data-del="N" data-model-add="Y" data-model-editing="Y" data-model-completed="N" class="model_set_wrap">';
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
                $(".simul_body").append(simulBodyHtml);
                $(".simul_wrap").attr("data-add-active", "N");
            } else {
                if ($(".model_set_wrap").length < 0) {
                    $(".simul_body").html(simulBodyHtml);
                } else {
                    let selDoorLeng = "Y";
                    $(".model_set_wrap[data-model-editing='Y']").find(".door_wrap .model_door").each(function() {
                        if ($(this).find(".door_img img").length) {
                            selDoorLeng = "N"
                        }
                    });
                    if (selDoorLeng == "Y") {
                        $(".model_set_wrap[data-model-editing='Y']").remove();
                        $(".simul_body").append(simulBodyHtml);
                    } else {
                        //$(".simul_body").html(simulBodyHtml);
                    }

                }
                let selDoorLeng = "Y";
                $(".model_set_wrap[data-model-editing='Y']").find(".door_wrap .model_door").each(function() {
                    if ($(this).find(".door_img img").length) {
                        selDoorLeng = "N"
                    }
                });
                if (selDoorLeng == "Y") {

                } else {

                }
                $(".simul_body").html(simulBodyHtml);
            }
            //$(".simul_body").html(simulBodyHtml);
            let modelWrap = $(".model_set_wrap[data-model-editing='Y']");
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
                                defaultImg = configData.modelConfig[idx].refrigeratorType[i].typModel[j].simulImg;
                                doorLeng = configData.modelConfig[idx].refrigeratorType[i].typModel[j].door.count;
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
                doorLeng = configData.modelConfig[idx].door.count;
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
                code = configData.modelConfig[idx].defaultCode;
                modelWrap.attr({ "data-model-cate": _name, "data-model_code": code });
                defaultImg = configData.modelConfig[idx].simulImg;
                doorLeng = configData.modelConfig[idx].door.count;
                if (doorLeng == 1) {
                    for (let k = 0; k < doorLeng; k++) {
                        let doorDirection;
                        let doorLocation;
                        if (k == 0) {
                            doorDirection = "TT";
                            doorLocation = "TT";
                        }
                        doorHtml += '<button type="button" data-edit="N" data-door-direction="' + doorDirection + '" data-door-model_location="' + doorLocation + '" data-door-model_spec_material="" data-door-model_spec_color="" class="model_door">';
                        doorHtml += '   <span class="blind">도어 선택</span>';
                        doorHtml += '   <span class="door_img"></span>';
                        doorHtml += '</button>';
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
        stepTwo: function() {
            let modelCate = $(".model_choice_tab .btn_model_pick.is_active").attr("data-lead-name");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let doorDirection = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-direction");
            let doorLocation = $("[data-model-editing='Y']").find("[data-edit='Y']").attr("data-door-model_location");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            console.log("modelCate", modelCate);
            console.log("modelCate2", modelCate2);
            console.log("modelCode", modelCode);
            console.log("doorDirection", doorDirection);
            console.log("doorLocation", doorLocation);
            if (modelCate == "refrigerator") {
                let refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType.length;
                for (let i = 0; i < refrigeratorTypeLeng; i++) {
                    if (configData.modelConfig[0].refrigeratorType[i].typ == modelCate2) {
                        let typModelLeng = refrigeratorTypeLeng = configData.modelConfig[0].refrigeratorType[i].typModel.length;
                        for (let j = 0; j < typModelLeng; j++) {
                            if (configData.modelConfig[0].refrigeratorType[i].typModel[j].defaultCode == modelCode) {
                                let doorMaterialLeng = configData.modelConfig[0].refrigeratorType[i].typModel[j].doorColorData.length;
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
                                        colorHtml += '  <button type="button" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" class="btn_door_color_sel">';
                                        colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                                        colorHtml += '      <span class="color_name">' + doorMaterialName + '<br>' + doorColorName + '</span>';
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
                        colorHtml += '  <button type="button" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" class="btn_door_color_sel">';
                        colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                        colorHtml += '      <span class="color_name">' + doorMaterialName + '<br>' + doorColorName + '</span>';
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
                let doorMaterialLeng = configData.modelConfig[2].doorColorData.length;
                let colorSelBodyHtml = '';
                for (let k = 0; k < doorMaterialLeng; k++) {
                    let doorColorLeng = configData.modelConfig[2].doorColorData[k].doorMaterial.doorColor.length;
                    let doorMaterialName = configData.modelConfig[2].doorColorData[k].doorMaterial.name;
                    let doorMaterialEnName = configData.modelConfig[2].doorColorData[k].doorMaterial.enName;
                    let doorMaterialCode = configData.modelConfig[2].doorColorData[k].doorMaterial.code;
                    let doorMaterialDesc = configData.modelConfig[2].doorColorData[k].doorMaterial.desc;
                    colorSelBodyHtml += '<div class="swiper-slide">';
                    colorSelBodyHtml += '   <dl>';
                    colorSelBodyHtml += '       <dt>' + doorMaterialName + '</dt>';
                    colorSelBodyHtml += '       <dd>';
                    colorSelBodyHtml += '           <ul>';
                    for (let l = 0; l < doorColorLeng; l++) {
                        let doorColorName = configData.modelConfig[2].doorColorData[k].doorMaterial.doorColor[l].name;
                        let doorColorCode = configData.modelConfig[2].doorColorData[k].doorMaterial.doorColor[l].code;
                        let doorColorMixingCode = configData.modelConfig[2].doorColorData[k].doorMaterial.doorColor[l].mixingCode;
                        let colorImgUrl = '/lg5-common/images/OBJ/experience/color/';
                        let colorImgName = 'color_' + doorMaterialCode + '_' + doorColorCode + '.png';
                        let colorHtml = '<li>';
                        colorHtml += '  <button type="button" data-m-code="' + doorMaterialCode + '" data-m-name="' + doorMaterialName + '" data-c-code="' + doorColorCode + '" data-c-name="' + doorColorName + '" data-mix-code="' + doorColorMixingCode + '" class="btn_door_color_sel">';
                        colorHtml += '      <span class="color_img"><img src="' + colorImgUrl + colorImgName + '" alt="" /></span>';
                        colorHtml += '      <span class="color_name">' + doorMaterialName + '<br>' + doorColorName + '</span>';
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
            $(".model_choice_area .model_choice_tab .btn_model_pick").not(".is_active").prop("disabled", true);
            $(".model_choice_area .model_sub_tab_wrap .btn_model_sub_pick").not(".is_selected").prop("disabled", true);
        },
        stepThree: function() {
            let modelCate1 = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-lead-name");
            let modelCate2 = $("[data-model-editing='Y']").attr("data-model-cate");
            let modelCateChild = $(".model_choice_area .model_choice_tab .btn_model_pick.is_active").attr("data-childcate");
            let modelCode = $("[data-model-editing='Y']").attr("data-model_code");
            let pompareCateLeng = configData.modelConfig.length
            let tblHtml = '';
            for (let i = 0; i < pompareCateLeng; i++) {
                if (modelCateChild == "Y") {
                    if (configData.modelConfig[i].id == modelCate1) {
                        let refrigeratorTypeLeng = configData.modelConfig[i].refrigeratorType.length;
                        for (let j = 0; j < refrigeratorTypeLeng; j++) {
                            if (configData.modelConfig[i].refrigeratorType[j].typ == modelCate2) {
                                let typModelLeng = configData.modelConfig[i].refrigeratorType[j].typModel.length;
                                for (let k = 0; k < typModelLeng; k++) {
                                    if (configData.modelConfig[i].refrigeratorType[j].typModel[k].defaultCode == modelCode) {
                                        let mainMagicSpace = configData.modelConfig[i].refrigeratorType[j].typModel[k].magicSpace;
                                        let mainEnergy = configData.modelConfig[i].refrigeratorType[j].typModel[k].energy;
                                        let mainKnockOn = configData.modelConfig[i].refrigeratorType[j].typModel[k].knockOn;
                                        let mainPrice = configData.modelConfig[i].refrigeratorType[j].typModel[k].defaultPrice;
                                        tblHtml += '<tr class="is_active">';
                                        tblHtml += '    <td><span>' + modelCode + '</span></td>';
                                        tblHtml += '    <td>' + mainMagicSpace + '개</td>';
                                        tblHtml += '    <td>' + mainEnergy + '등급</td>';
                                        tblHtml += '    <td>' + mainPrice + '원</td>';
                                        tblHtml += '</tr>';
                                        if (configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel == undefined) {

                                        } else {
                                            let subModelLeng = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel.length;
                                            for (let l = 0; l < subModelLeng; l++) {
                                                let subCode = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel[l].modelCode;
                                                let subMagicSpace = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel[l].magicSpace;
                                                let subEnergy = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel[l].energy;
                                                let subKnockOn = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel[l].knockOn;
                                                let subPrice = configData.modelConfig[i].refrigeratorType[j].typModel[k].subModel[l].defaultPrice;
                                                tblHtml += '<tr>';
                                                tblHtml += '    <td><span>' + subCode + '</span></td>';
                                                tblHtml += '    <td>' + subMagicSpace + '개</td>';
                                                tblHtml += '    <td>' + subEnergy + '등급</td>';
                                                tblHtml += '    <td>' + subPrice + '원</td>';
                                                tblHtml += '</tr>';

                                            }
                                        }

                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                    break;

                }

            }
            let compareHtml = '<div class="tb_row tb_compare">';
            compareHtml += '    <table>';
            compareHtml += '        <caption>기능과 가격을 비교하여 모델 안내</caption>';
            compareHtml += '        <colgroup>';
            compareHtml += '            <col style="width:34%">';
            compareHtml += '            <col style="width:20.5%">';
            compareHtml += '            <col style="width:20.5%">';
            compareHtml += '            <col style="width:25%">';
            compareHtml += '        </colgroup>';
            compareHtml += '        <thead>';
            compareHtml += '            <tr>';
            compareHtml += '                <th scope="col">모델명</th>';
            compareHtml += '                <th scope="col">매직스페이스</th>';
            compareHtml += '                <th scope="col">에너지 효율</th>';
            compareHtml += '                <th scope="col">가격</th>';
            compareHtml += '            </tr>';
            compareHtml += '        </thead>';
            compareHtml += '        <tbody>';
            compareHtml += tblHtml;
            compareHtml += '        </tbody>';
            compareHtml += '    </table>';
            compareHtml += '</div>';
            $(".compare_sel_model_area").addClass("is_active").html(compareHtml);
            $(".simul_step3 .etc_area").addClass("is_active");
        }
    }



})();