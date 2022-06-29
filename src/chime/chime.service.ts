import { Injectable } from '@nestjs/common';
import { Chime, Endpoint, Credentials } from "aws-sdk"
import { v4 as uuidv4 } from "uuid"
import {ConfigService} from "@nestjs/config"
import {Logger} from "@nestjs/common"

@Injectable()
export class ChimeService {
	private chime: Chime
	private credentials: Credentials
	private logger: Logger
	private uuid: uuidv4

	constructor(private readonly configService: ConfigService) {

		this.credentials = new Credentials(
			this.configService.get("aws_access_key_id"),
			this.configService.get("aws_secret_access_key"),
			null
		)
		this.chime = new Chime({ region: "us-east-1" })
		this.chime.endpoint = new Endpoint("https://service.chime.aws.amazon.com/console")
		this.logger = new Logger("ChimeService")
		this.uuid = uuidv4()
	}

	getMeetingResponse = async () => {
		const response = await this.chime.createMeeting({
			ClientRequestToken: this.uuid,
			MediaRegion: "us-east-1",
		}).promise()
		this.logger.log("Get meeting response : ")
		this.logger.debug(response)
		return response
	}

	getAttendeeResponse = async () => {
		const meetingResponse = await this.getMeetingResponse()
		const response = await this.chime.createAttendee({
			MeetingId: meetingResponse.Meeting.MeetingId,
			ExternalUserId: this.uuid
		}).promise()
		this.logger.log("Get attendee response : ")
		this.logger.debug(response)
		return response
	}

	getJoiningMeetingAttendee = async (meetingId: string) => {
		const existingMeeting = await this.chime.getMeeting({
			MeetingId: meetingId
		}).promise()
		const newCreatedAttendee = await this.chime.createAttendee({
			MeetingId: meetingId,
			ExternalUserId: this.uuid
		}).promise()
		this.logger.log("Get joining attendee response : ")
		this.logger.debug(newCreatedAttendee)
		this.logger.log("Get already existing meeting response : ")
		this.logger.debug(existingMeeting)
		return {
			existingMeeting, newCreatedAttendee
		}
	}
}
