define([
    'knockout-plus',
    'kb_common/html',
    'kb_common/bootstrapUtils'
], function(
    ko,
    html,
    BS
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    function viewModel(params) {
        var searchResults = params.searchVM.searchResults;
        return {
            searchResults: searchResults
        };
    }

    function template() {
        return div({
            class: 'well'
        }, [
            div({}, [
                table({
                    class: 'table table-striped'
                }, [
                    tr([
                        th({
                            style: {
                                width: '5%'
                            }
                        }, '#'),
                        th({
                            style: {
                                width: '5%'
                            }
                        }, 'Score'),
                        th({
                            style: {
                                width: '60%'
                            }
                        }, 'Title'),
                        th({
                            style: {
                                width: '15%'
                            }
                        }, 'Modified'),
                        th({
                            style: {
                                width: '15%'
                            }
                        }, 'File type')
                    ]),
                    '<!-- ko foreach: searchResults -->',
                    tr([
                        td({
                            dataBind: {
                                text: 'rowNumber'
                            }
                        }),
                        td({
                            dataBind: {
                                text: 'score'
                            }
                        }),
                        td({
                            dataBind: {
                                text: 'title'
                            }
                        }),
                        td({
                            dataBind: {
                                text: 'date'
                            }
                        }),
                        td({
                            dataBind: {
                                text: 'fileType'
                            }
                        })
                    ]),
                    '<!-- /ko -->'
                ])
            ])
        ]);
    }

    function buildImportView() {
        return div({
            class: 'container-fluid'
        }, [
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-md-6'
                }, table({
                    class: 'table table-striped',
                    dataBind: {
                        with: 'file'
                    }
                }, [
                    tr([
                        th('Filename'),
                        td({
                            dataBind: {
                                text: 'name'
                            }
                        })
                    ]),
                    tr([
                        th('Size'),
                        td({
                            dataBind: {
                                text: 'size'
                            }
                        })
                    ]),
                    tr([
                        th('Type'),
                        td({
                            dataBind: {
                                text: 'type'
                            }
                        })
                    ]),
                    tr([
                        th('Status'),
                        td({
                            dataBind: {
                                text: 'status'
                            }
                        })
                    ]),

                    tr([
                        th('Date added'),
                        td({
                            dataBind: {
                                text: 'added'
                            }
                        })
                    ])
                ])), div({
                    class: 'col-md-6'
                }, 'import form here')
            ])
        ]);
    }

    function template2() {
        return div({
            class: 'component-jgi-search-search-result'
        }, [
            div({}, [
                div({
                    class: '-results'
                }, [
                    div({
                        class: '-header'
                    }, [
                        div({
                            style: {
                                display: 'inline-block',
                                width: '5%'
                            }
                        }, '#'),
                        div({
                            style: {
                                display: 'inline-block',
                                width: '5%'
                            }
                        }, 'Score'),
                        div({
                            style: {
                                display: 'inline-block',
                                width: '10%'
                            }
                        }, 'Project ID'),
                        div({
                            style: {
                                display: 'inline-block',
                                width: '50%'
                            }
                        }, 'Title'),
                        div({
                            style: {
                                display: 'inline-block',
                                width: '15%'
                            }
                        }, 'Modified'),
                        div({
                            style: {
                                display: 'inline-block',
                                width: '15%'
                            }
                        }, 'File type')
                    ]),
                    '<!-- ko foreach: searchResults -->',
                    div({
                        class: '-result'
                    }, [
                        div({
                            dataBind: {
                                click: 'function (data) {data.showDetail(!data.showDetail());}',
                                css: {
                                    '-active': 'showDetail'
                                }
                            },
                            class: '-summary-row'
                        }, [
                            div({
                                dataBind: {
                                    text: 'rowNumber'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '5%'
                                }
                            }),
                            div({
                                dataBind: {
                                    text: 'score'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '5%'
                                }
                            }),
                            div({
                                dataBind: {
                                    text: 'projectId'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '10%'
                                }
                            }),
                            div({
                                dataBind: {
                                    text: 'title'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '50%'
                                }
                            }),
                            div({
                                dataBind: {
                                    text: 'modified'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '15%'
                                }
                            }),
                            div({
                                dataBind: {
                                    text: 'fileType'
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '15%'
                                }
                            })
                        ]),
                        '<!-- ko if: showDetail -->',
                        BS.buildTabs({
                            tabs: [{
                                name: 'import',
                                label: 'Import',
                                body: div({
                                    style: {
                                        margin: '4px',
                                        border: '1px silver solid',
                                        padding: '4px'
                                    }
                                }, buildImportView())
                            }, {
                                name: 'metadata',
                                label: 'Metadata',
                                body: div({
                                    dataBind: {
                                        component: {
                                            name: '"jgisearch/json-viewer"',
                                            params: {
                                                value: '$data.detail.metadata',
                                                open: true
                                            }
                                        }
                                    },
                                    style: {
                                        margin: '4px',
                                        border: '1px silver solid',
                                        padding: '4px'
                                    }
                                })
                            }, {
                                name: 'alldata',
                                label: 'All Data',
                                body: div({
                                    dataBind: {
                                        component: {
                                            name: '"jgisearch/json-viewer"',
                                            params: {
                                                value: '$data.detail'
                                            }
                                        }
                                    },
                                    style: {
                                        margin: '4px',
                                        border: '1px silver solid',
                                        padding: '4px'
                                    }
                                })
                            }, {
                                name: 'rawdata',
                                label: 'Raw Data',
                                body: div({
                                    class: '-detail',
                                    dataBind: {
                                        text: 'detailFormatted'
                                    }
                                })
                            }]
                        }).content,
                        '<!-- /ko -->'
                    ]),
                    '<!-- /ko -->'
                ])
            ])
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template2()
        };
    }

    ko.components.register('jgisearch/search-result', component());
});