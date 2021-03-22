import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { Observable, combineLatest } from 'rxjs';
import { TrackedEntityTypes } from '../../programs';
import * as _ from 'lodash';
@Injectable({
  providedIn: "root"
})
export class TrackerService {
  constructor(
    private http: HttpClientService
  ) { }

  generateId(): string {
    const id = Math.random()
      .toString(36)
      .substr(2, 11);
    if (id.length !== 11 || !isNaN(parseInt(id.substring(0, 1)))) {
      return this.generateId();
    }
    return id;
  }

  // save tracked entity Instances
  saveTrackedEntityInstances(trackedEntityInstances:any[]) {
    return this.http.post(`30/trackedEntityInstances`, {
      trackedEntityInstances: trackedEntityInstances
    });
  }

  updateTrackedEntityInstance(trackedEntityInstances:any, trackedEntityInstanceId) {
    return this.http.put(`30/trackedEntityInstances/`+trackedEntityInstanceId, trackedEntityInstances);
  }

  saveEvents(events) {
    return this.http.post(`30/events?strategy=CREATE_AND_UPDATE`, {
      events: events
    });
  }

  deleteEvent(eventId) {
    return new Observable(observe => {
      this.http.delete(`30/events/${eventId}?strategy=DELETE`).subscribe((response)=>{
        observe.next(response);
        observe.complete();
      }, (error)=>{
        observe.error(error);
        observe.complete();

      });

    });
  }

  deleteTrackedEntityInstance(trackedEntityInstanceId: string): Observable<any> {
return new Observable(observe => {
  this.http.delete(`30/trackedEntityInstances/`+trackedEntityInstanceId).subscribe((response)=>{
    let formData: FormData = new FormData();
    formData.append('analyticsTableClear','false');
    formData.append('analyticsTableAnalyze','false');
    formData.append('zeroDataValueRemoval','false');
    formData.append('softDeletedDataValueRemoval','true');
    formData.append('softDeletedEventRemoval','true');
    formData.append('softDeletedEnrollmentRemoval','true');
    formData.append('softDeletedTrackedEntityInstanceRemoval','true');
    formData.append('periodPruning','false');
    formData.append('expiredInvitationsClear','false');
    formData.append('sqlViewsDrop','false');
    formData.append('sqlViewsCreate','false');
    formData.append('categoryOptionComboUpdate','false');
    formData.append('ouPathsUpdate','true');
    formData.append('cacheClear','true');
    formData.append('appReload','true');
    this.http.post('maintenance',formData).subscribe((results)=>{
      observe.next(results);
    observe.complete();
    });
  }, (error)=>{
    observe.error(error);
    observe.complete();

  });

});
  }

  deleteEvents(events) {
    return this.http.post(`30/events?strategy=DELETE`, {
      events: events
    });
  }


  // update tracked entity
  updateTrackedEntity(trackedEntity, trackedEntityInstanceId) {
    return this.http.put(
      `30/trackedEntityInstances/${trackedEntityInstanceId}`,
      trackedEntity
    );
  }

  // cancel tracked entity
  cancelTrackedEntity(trackedEntity, trackedEntityInstanceId) {
    return this.http.put(
      `30/trackedEntityInstances/${trackedEntityInstanceId}`,
      trackedEntity
    );
  }

  // get enrollments tracked entity
  getEnrollments(trackedEntityId, ouId) {
    return this.http.get(
      `30/enrollments.json?ou=${ouId}&ouMode=SELECTED&trackedEntity=${trackedEntityId}&paging=false`
    );
  }

  // delete tracked entity
  deleteTrackedEntity(trackedEntity, trackedEntityInstanceId) {
    return this.http.put(
      `30/trackedEntityInstances/${trackedEntityInstanceId}`,
      trackedEntity
    );
  }

  getEvents(
    key,
    ou,
    stageKey,
    ouMode = "SELECTED",
    filter = ""
  ): Observable<any> {
    return Observable.create(observer => {
      const metadata = TrackedEntityTypes[key];
      if (!metadata) {
        observer.next([]);
        observer.complete();
      } else {
        const stage = metadata.stage[stageKey];
        const eventsRequest = this.http.get(
          `events.json?programStage=${
          stage.id
          }&orgUnit=${ou}&ouMode=${ouMode}&paging=false${filter}`
        );
        eventsRequest.subscribe(
          (result: any) => {
            const retunItem = result.events.map(event => {
              const dataObject = {};
              dataObject["id"] = event.event;
              dataObject["organisation_unit_id"] = event.orgUnit;
              dataObject["trackedEntityInstance"] = event.trackedEntityInstance;
              dataObject["enrollment"] = event.enrollment;
              dataObject["created"] = event.created;
              dataObject["programStage"] = event.programStage;
              stage.dataElements.forEach(element => {
                const attribute_name = this._getAttributeKeyId(
                  stage.dataElements,
                  element.key
                );
                const dataElement = _.find(event.dataValues, {
                  dataElement: attribute_name
                });
                if (dataElement) {
                  dataObject[element.key] = dataElement["value"];
                }
              });
              return dataObject;
            });
            observer.next(retunItem);
            observer.complete();
          },
          error => observer.error()
        );
      }
    });
  }

  transformEventData(key, stageKey,eventData){
    let dataValues = [];
    const metadata = TrackedEntityTypes[key];
    if (!metadata) {
      return [];
    } else {
      const stage = metadata.stage[stageKey];

      eventData.forEach(event=>{
        let eventObject = {};
        stage.dataElements.forEach(element => {
          eventObject[element.key] = event[element.key];
        });
        dataValues = [...dataValues,eventObject];
      });
    }
    return dataValues;
  }

  getEventsWithDate(
    key,
    ou,
    stageKey,
    ouMode = "SELECTED",
    filter = "",
    startDate = null,
    endDate = null
  ): Observable<any> {
    return Observable.create(observer => {
      const metadata = TrackedEntityTypes[key];
      if (!metadata) {
        observer.next([]);
        observer.complete();
      } else {
        // startDate = startDate ? startDate : new Date().toISOString().substr(0, 10);
        // const today = new Date();
        // const yersteday = new Date(today.setDate(today.getDate() - 1));
        // endDate = endDate ? endDate : new Date(yersteday).toISOString().substr(0, 10);
        const stage = metadata.stage[stageKey];
        let eventUrl = `events.json?programStage=${
          stage.id
          }&orgUnit=${ou}&ouMode=${ouMode}&paging=false${filter}`;
        if (startDate) {
          eventUrl += `&startDate=${startDate}&endDate=${endDate}`;
        }
        const eventsRequest = this.http.get(eventUrl);
        eventsRequest.subscribe(
          (result: any) => {
            const retunItem = result.events.map(event => {
              const dataObject = {};
              dataObject["id"] = event.event;
              dataObject["organisation_unit_id"] = event.orgUnit;
              dataObject["trackedEntityInstance"] = event.trackedEntityInstance;
              dataObject["enrollment"] = event.enrollment;
              dataObject["created"] = event.created;
              dataObject["programStage"] = event.programStage;
              stage.dataElements.forEach(element => {
                const attribute_name = this._getAttributeKeyId(
                  stage.dataElements,
                  element.key
                );
                const dataElement = _.find(event.dataValues, {
                  dataElement: attribute_name
                });
                if (dataElement) {
                  dataObject[element.key] = dataElement["value"];
                }
              });
              return dataObject;
            });
            observer.next(retunItem);
            observer.complete();
          },
          error => observer.error()
        );
      }
    });
  }


  prepareTrackedEntityFilterString(
    key,
    filters: { attribute_key: string; value: any }[]
  ): string {
    let filterString = "";
    const metadata = TrackedEntityTypes[key];
    if (metadata) {
      filterString = filters
        .map(filter => {
          const filterId = this._getAttributeKeyId(
            metadata.attributes,
            filter.attribute_key
          );
          return filterId ? `filter=${filterId}:eq:${filter.value}` : "";
        })
        .filter(item => item !== "")
        .join("&");
    }
    return filterString === "" ? "" : `&${filterString}`;
  }

  prepareEventEntityFilterString(
    programKey,
    stageKey,
    filters: { attribute_key: string; value: any }[]
  ): string {
    let filterString = "";
    const metadata = TrackedEntityTypes[programKey];
    if (metadata) {
      const stage = metadata.stage[stageKey];
      if (stage) {
        filterString = filters
          .map(filter => {
            const filterId = this._getAttributeKeyId(
              stage.dataElements,
              filter.attribute_key
            );
            return filterId ? `filter=${filterId}:eq:${filter.value}` : "";
          })
          .filter(item => item !== "")
          .join("&");
      }
    }
    return filterString === "" ? "" : `&${filterString}`;
  }

  getTrackedEntityInstance(
    key,
    ou,
    ouMode = "SELECTED",
    filter = ""
  ): Observable<any> {
    return Observable.create(observer => {
      const metadata = TrackedEntityTypes[key];
      if (!metadata) {
        observer.next([]);
        observer.complete();
      } else {
        const enrolmentDetails = this.getEnrollments(metadata.id, ou);
        const trackedEntities = this.http.get(
          `trackedEntityInstances.json?ou=${ou}&ouMode=${ouMode}&program=${
          metadata.program
          }&paging=false${filter}`
        );
        combineLatest(trackedEntities, enrolmentDetails).subscribe(
          ([data, enrolmentData]) => {
            const returnObject = data.trackedEntityInstances.map(resultRow => {
              const dataObject: any = {};
              dataObject["id"] = resultRow["trackedEntityInstance"];
              dataObject["trackedEntityInstance"] = resultRow["trackedEntityInstance"];
              metadata.attributes.forEach((attribute: any) => {
                const attribute_name = this._getAttributeKeyId(
                  metadata.attributes,
                  attribute.key
                );
                const dataElement = _.find(resultRow.attributes, {
                  attribute: attribute_name
                });
                if (dataElement) {
                  dataObject[attribute.key] = dataElement["value"];
                }
              });
              const enrollmentItem: any = _.find(enrolmentData.enrollments, {
                trackedEntityInstance: dataObject.id
              });
              const enrollment_id: string = enrollmentItem
                ? enrollmentItem.enrollment
                : "";
              return {
                ...dataObject,
                enrollment_id: enrollment_id,
                organisation_unit_id: resultRow["orgUnit"],
                last_updated: resultRow["lastUpdated"],
                created: resultRow["created"],
                inactive: resultRow["inactive"]
              };
            });
            observer.next(returnObject);
            observer.complete();
          },
          error1 => observer.error()
        );
      }
    });
  }



  /**
   * this function will be used to prepare a dhis2 payload
   * @param key
   * @param ou
   * @param values
   * @param action
   * @param trackedEntityInstance
   * @param eventDate
   */
  prepareTrackedEntityPayload(
    key,
    ou,
    values,
    action,
    trackedEntityInstance,
    eventDate
  ) {
    const metadata = TrackedEntityTypes[key];
    const date = eventDate || new Date().toISOString().substring(0, 10);
    const returnItem = {
      trackedEntityType: metadata.id,
      orgUnit: ou,
      attributes: metadata.attributes.map((attribute: any) => {
        return {
          attribute: attribute.id,
          value: values[attribute.key]
        };
      })
    };
    if (trackedEntityInstance !== null) {
      returnItem["trackedEntityInstance"] = trackedEntityInstance;
    }
    if (action === "add") {
      returnItem["enrollments"] = [
        {
          orgUnit: ou,
          program: metadata.program,
          enrollmentDate: date,
          incidentDate: date
        }
      ];
    } else {
      returnItem["trackedEntityInstance"] = trackedEntityInstance;
      returnItem["programOwners"] = [
        {
          ownerOrgUnit: ou,
          program: metadata.program,
          trackedEntityInstance
        }
      ];
    }

    return returnItem;
  }

  /**
   * This function will prepare an event payload ready to be sent to the server
   * @param key
   * @param ou
   * @param trackedEntityInstance
   * @param stageKey
   * @param enrollment
   * @param values
   * @param event
   * @param date
   */
  prepareEvents(
    key,
    ou,
    trackedEntityInstance,
    stageKey,
    enrollment,
    values,
    event = null,
    date = null
  ) {
    const metadata = TrackedEntityTypes[key];
    const stage = metadata.stage[stageKey];
    const eventData = {
      program: metadata.program,
      programStage: stage.id,
      orgUnit: ou,
      notes: [],
      status: "ACTIVE",
      eventDate: date ? date : new Date().toISOString().substring(0, 10),
      dataValues: stage.dataElements.map((dataElement: any) => {
        return {
          dataElement: dataElement.id,
          value: values[dataElement.key]
        };
      })
    };
    if (trackedEntityInstance !== null) {
      eventData["trackedEntityInstance"] = trackedEntityInstance;
    }
    if (enrollment !== null) {
      eventData["enrollment"] = enrollment;
    }
    if (event) {
      eventData["event"] = event;
    }
    return eventData;
  }

  /**
   * This function will prepare an event payload ready to be sent to the server
   * @param key
   * @param ou
   * @param trackedEntityInstance
   * @param stageKey
   * @param enrollment
   * @param values
   * @param event
   * @param date
   */
  prepareSingleEvent(
    key,
    ou,
    stageKey,
    values,
    date = null
  ) {
    const metadata = TrackedEntityTypes[key];
    const stage = metadata.stage[stageKey];
    const eventData = {
      program: metadata.program,
      programStage: stage.id,
      orgUnit: ou,
      notes: [],
      status: "ACTIVE",
      eventDate: date ? date : new Date().toISOString().substring(0, 10),
      dataValues: stage.dataElements.map((dataElement: any) => {
        return {
          dataElement: dataElement.id,
          value: values[dataElement.key]
        };
      })
    };
    return eventData;
  }
  /**
   * finding the position of the item in rows- used when fetching data
   * @param analyticsObjectHeaders : Array
   * @param name : String ['ou','dx','co','pe',....]
   * @returns {number}
   * @private
   */
  _getTitleIndex(analyticsObjectHeaders, name: string) {
    return _.findIndex(analyticsObjectHeaders, { name });
  }

  _getAttributeKeyId(attributes, key) {
    const attributeItem: any = _.find(attributes, { key });
    return attributeItem ? attributeItem.id : null;
  }

  _getDataValuesElement(dataValues, dataElement) {
    return _.find(dataValues, { dataElement });
  }

  _getRowItems(position: number, array) {
    const return_array = [];
    for (const item of array) {
      if (return_array.indexOf(item[position]) === -1) {
        return_array.push(item[position]);
      }
    }
    return return_array;
  }
}
